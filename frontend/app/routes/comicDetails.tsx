import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getComicById } from "~/Services/functions";
import type { ComicDTO } from "~/Types/interfaces";

const comicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //When we get params they always come in string, doesn't matter what
  const [comic, setComic] = useState<ComicDTO | null>(null);

  useEffect(() => {
    const fetchComicDetails = async () => {
      if (id) {
        const comicId = Number(id); // Convert id to a number
        if (!isNaN(comicId)) {
          try {
            const fetchedComic = await getComicById(comicId);
            setComic(fetchedComic);
          } catch (error) {
            console.error("Error al obtener los detalles del cómic:", error);
          }
        }
      }
    };

    fetchComicDetails();
  }, [id]); // For every time page reloads, in case we select another comic

  if (!comic) {
    return <div>Cargando detalles del cómic...</div>;
  }

  return (
    <div className="comic-details">
      <div className="w-full px-20">
        <div className="flex justify-center">
          <div className="comic-card">
            <h1>{comic.title}</h1>
            <img src={comic.coverUrl} alt={comic.title} width={300} />
            <p>{comic.description}</p>
            <p>Precio: {comic.price}€</p>
            <p>Fecha de lanzamiento: {comic.launchDate}</p>
            <p>Páginas: {comic.pageCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default comicDetails;
