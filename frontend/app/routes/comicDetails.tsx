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
    return <div>
      <p className="text-center text-2xl">Cargando detalles del cómic...</p>
      <p className="text-center mt-4">A veces necesitamos descansar...</p></div>;
  }

  return (
    <div className="comic-details bg-gray-100 py-12">
  <div className="container mx-auto px-4">
    <div className="flex justify-center">
      <div className="comic-card bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-cyan-600 mb-6">{comic.title}</h1>
        <div className="flex justify-center mb-6">
          <img
            src={comic.coverUrl}
            alt={comic.title}
            className="rounded-lg shadow-lg"
            width={500}
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-lg text-gray-700 mb-4">{comic.description}</p>
        <div className="flex flex-col space-y-2">
          <p className="text-lg text-gray-900 font-semibold">
            <span className="text-gray-600">Precio:</span> {comic.price}€
          </p>
          <p className="text-lg text-gray-900 font-semibold">
            <span className="text-gray-600">Fecha de lanzamiento:</span> {comic.launchDate}
          </p>
          <p className="text-lg text-gray-900 font-semibold">
            <span className="text-gray-600">Páginas:</span> {comic.pageCount}
          </p>
          <p className="text-lg text-gray-900 font-semibold">
            <span className="text-gray-600">Edita:</span> {comic.publisherDTO.name}
          </p>
          <p className="text-lg text-gray-900 font-semibold">
            <span className="text-gray-600">Autor:</span> {comic.authorDTO.name} {comic.authorDTO.lastName}
          </p>
          <div className="flex justify-center">
          <button className="bg-cyan-500 hover:bg-cyan-700 px-3 py-3 w-40 text-6xl text-white">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default comicDetails;
