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
import type { ComicDTO, ReviewDTO } from "~/Types/interfaces";
import Reviews from "~/Components/Reviews";
import ReviewPost from "~/Components/ReviewPost";

const ComicDetails: React.FC = () => { // Renamed for convention
  const { id } = useParams<{ id: string }>();
  const [comic, setComic] = useState<ComicDTO | null>(null);
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [addedToCollection, setAddedToCollection] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const { userId } = useUser();

  useEffect(() => {
    const fetchComicDetails = async () => {
      if (id) {
        const comicId = Number(id);
        if (!isNaN(comicId)) {
          try {
            const fetchedComic = await getComicById(comicId);
            setComic(fetchedComic);
            setReviews(fetchedComic.reviewDTO);
            const hasIt = await hasTheUserTheComic(comicId, userId!);
            setAddedToCollection(hasIt);

            const userReview = fetchedComic.reviewDTO.find(
              (review) => review.userDTO.id === userId
            );
            setHasReviewed(!!userReview);
          } catch (error) {
            console.error("Error al obtener los detalles del cómic:", error);
          }
        }
      }
    };

    fetchComicDetails();
  }, [id, userId]);

  if (!comic) {
    return (
      <div>
        <p className="text-center text-2xl">Cargando detalles del cómic...</p>
        <p className="text-center mt-4">A veces necesitamos descansar...</p>
      </div>
    );
  }

  const showTemporaryMessage = (
    text: string,
    type: "success" | "error" = "success"
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddToCollection = async () => {
    try {
      console.log("Número del id del usuario " + userId);
      await addComicToCollection(comic.id, userId!);
      setAddedToCollection(true);
      showTemporaryMessage("¡Cómic añadido correctamente!", "success");
    } catch (error) {
      console.error("Error al añadir");
    }
  };

  const handleRemoveFromCollection = async () => {
    try {
      await removeComicFromCollection(comic.id, userId!);
      setAddedToCollection(false);
      showTemporaryMessage("Cómic eliminado correctamente.", "error");
    } catch (error) {
      console.log("Error al eliminar");
    }
  };

  const handleSubmitReview = async (rating: number, text: string) => {
    try {
      if (!userId || !comic.id) {
        console.error("userId o comic.id son nulos");
        showTemporaryMessage("Error: Datos de usuario o cómic no disponibles.", "error");
        return;
      }
  
      console.log("Enviando reseña para el cómic ID:", comic.id, "Usuario ID:", userId);
      const newReview = await postReview(comic.id, rating, text);
      console.log("Reseña enviada con éxito. Reseña recibida del backend:", newReview);
      setReviews((prevReviews) => {
        //This creates a new array that contains all previous reviews + the new one
        return [...prevReviews, newReview];
      });
  
      setHasReviewed(true);
      showTemporaryMessage("¡Reseña enviada correctamente!", "success"); 
      console.log("Reseña enviada y estado de reviews actualizado.");
  
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      showTemporaryMessage("Error al enviar la reseña.", "error");
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
                      <FaCheck />
                      <span className="absolute text-sm bg-black text-white rounded px-2 py-1 bottom-[-40px] hidden group-hover:block z-10">
                        Remove
                      </span>
                    </button>
                  </div>
                  {!hasReviewed && (
                    <ReviewPost onSubmitReview={handleSubmitReview} />
                  )}
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

              {message && (
                <p
                  className={`text-center font-semibold mt-4 ${
                    message.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <div className="mt-6">
                <Reviews reviews={reviews} key={reviews.length} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicDetails;