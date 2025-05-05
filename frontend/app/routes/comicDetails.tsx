import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useUser } from "~/Contexts/UserContext";
import { FaCheck } from "react-icons/fa";
import {
  addComicToCollection,
  getComicById,
  hasTheUserTheComic,
  postReview,
  removeComicFromCollection,
} from "~/Services/functions";
import type { ComicDTO } from "~/Types/interfaces";
import Reviews from "~/Components/Reviews";
import ReviewPost from "~/Components/ReviewPost";

const comicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //When we get params they always come in string, doesn't matter what
  const [comic, setComic] = useState<ComicDTO | null>(null);
  const [addedToCollection, setAddedToCollection] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const { userId } = useUser();

  useEffect(() => {
    const fetchComicDetails = async () => {
      if (id) {
        const comicId = Number(id); // Convert id to a number
        if (!isNaN(comicId)) {
          try {
            const fetchedComic = await getComicById(comicId);
            setComic(fetchedComic);
            const hasIt = await hasTheUserTheComic(comicId, userId!);
            setAddedToCollection(hasIt);

            // Verificar si el usuario ya ha hecho una reseña
            const userReview = fetchedComic.reviewDTO.find(
              (review) => review.userDTO.id === userId
            );
            setHasReviewed(!!userReview); // true si ya hay reseña del usuario
          } catch (error) {
            console.error("Error al obtener los detalles del cómic:", error);
          }
        }
      }
    };

    fetchComicDetails();
  }, [id, userId]); // For every time page reloads, in case we select another comic

  if (!comic) {
    return (
      <div>
        <p className="text-center text-2xl">Cargando detalles del cómic...</p>
        <p className="text-center mt-4">A veces necesitamos descansar...</p>
      </div>
    );
  }

  const handleAddToCollection = async () => {
    try {
      console.log("Número del id del usuario " + userId);
      await addComicToCollection(comic.id, userId!); //! at end is like telling Typescript that's not going to be null or undefined
      setAddedToCollection(true);
    } catch (error) {
      console.error("Error al añadir");
    }
  };

  const handleRemoveFromCollection = async () => {
    try {
      await removeComicFromCollection(comic.id, userId!);
      setAddedToCollection(false);
    } catch (error) {
      console.log("Error al eliminar");
    }
  };

  const handleSubmitReview = async (rating: number, text: string) => {
    try {
      if (!userId || !comic.id) {
        console.error("userId o comic.id son nulos");
        return;
      }

      await postReview(comic.id, rating, text);
      const updatedComic = await getComicById(comic.id);
      setComic(updatedComic);
      setHasReviewed(true);
      console.log("Reseña enviada y comic actualizado.");
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    }
  };

  return (
    <div className="comic-details bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="comic-card bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full">
            <h1 className="text-4xl font-bold text-cyan-600 mb-6">
              {comic.title}
            </h1>
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
                <span className="text-gray-600">Fecha de lanzamiento:</span>{" "}
                {comic.launchDate}
              </p>
              <p className="text-lg text-gray-900 font-semibold">
                <span className="text-gray-600">Páginas:</span>{" "}
                {comic.pageCount}
              </p>
              <p className="text-lg text-gray-900 font-semibold">
                <span className="text-gray-600">Edita:</span>{" "}
                <Link to={`/publisherDetails/${comic.publisherDTO.id}`}>
                  {" "}
                  {comic.publisherDTO.name}{" "}
                </Link>
              </p>
              <p className="text-lg text-gray-900 font-semibold">
                <span className="text-gray-600">Autor:</span>{" "}
                {comic.authorDTO.name} {comic.authorDTO.lastName}
              </p>
              {addedToCollection ? (
                <>
                  <div className="flex justify-center">
                    <button
                      onClick={handleRemoveFromCollection}
                      className="relative group px-3 py-3 w-40 text-6xl text-white flex justify-center items-center rounded-xl bg-green-500 hover:bg-red-600 transition-all duration-200"
                    >
                      {/* To use FaCheck you need to install npm install react-icons} {*/}
                      <FaCheck />
                      <span className="absolute text-sm bg-black text-white rounded px-2 py-1 bottom-[-40px] hidden group-hover:block z-10">
                        Remove
                      </span>
                    </button>
                  </div>
                  {!hasReviewed && <ReviewPost onSubmitReview={handleSubmitReview} />}
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <button
                      onClick={handleAddToCollection}
                      className="px-3 py-3 w-40 text-6xl text-white flex justify-center items-center rounded-xl bg-cyan-500 hover:bg-cyan-700 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </>
              )}

              <div className="mt-6">
                <Reviews reviews={comic.reviewDTO} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default comicDetails;
