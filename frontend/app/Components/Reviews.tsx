import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useUser } from "~/Contexts/UserContext";
import { deleteReview, updateReview } from "~/Services/functions";
import type { ReviewDTO } from "~/Types/interfaces";
import ReviewPost from "./ReviewPost";

function Reviews({ reviews }: { reviews: ReviewDTO[] }) {
  const { userId } = useUser();
  const [reviewList, setReviewList] = useState(reviews);
  const [isEditReviewSelected, setIsEditReviewSelected] = useState(false);
  const [editReview, setEditReview] = useState<ReviewDTO | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    setReviewList(reviews);
  }, [reviews]);

  const showTemporaryMessage = (
    text: string,
    type: "success" | "error" = "success" //In fact type over here is always gonna be success
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviewList((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
      showTemporaryMessage("Reseña eliminada correctamente", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReview = async (rating: number, text: string) => {
    if (!editReview) return;

    try {
      await updateReview(editReview.id, rating, text);
      setReviewList((prevReviews) =>
        prevReviews.map((review) =>
          review.id === editReview.id
            ? { ...review, reviewText: text, rating }
            : review
        )
      );
      showTemporaryMessage("Reseña editada correctamente", "success");
      setIsEditReviewSelected(false); // Close the edit form
      setEditReview(null);
    } catch (error) {
      console.error("Error al editar la reseña:", error);
    }
  };

  return (
    <>
      <h2 className="text-4xl text-center text-cyan-500 mb-4">Reseñas</h2>

      <div>
        {reviewList.length === 0 ? (
          <h2 className="text-center text-2xl">
            Vaya... Nadie lo ha leído aún ;(
          </h2>
        ) : (
          reviewList.map((review) => (
            <div key={review.id}>
              <div className="review-box">
                <div className="flex justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="/avatarplaceholder.png"
                      alt="placeholder"
                      className="rounded w-20"
                    />
                    <p className="text-2xl text-cyan-700 font-bold">
                      {review.userDTO.nick}
                    </p>
                    <span className="text-2xl">ha valorado con</span>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-xl" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    {new Date(review.lastUpdatedAt).toLocaleDateString("es-ES")}
                  </div>
                </div>
                <p className="ms-24 text-2xl mb-10">{review.reviewText}</p>
              </div>

              {review.userDTO.id === userId && (
                <div className="flex justify-between ms-24 mb-4">
                  {!isEditReviewSelected ? (
                    <button
                      className="text-black underline"
                      onClick={() => {
                        setIsEditReviewSelected(true);
                        setEditReview(review);
                      }}
                    >
                      Editar reseña
                    </button>
                  ) : (
                    <ReviewPost
                      onSubmitReview={handleEditReview}
                      initialRating={review.rating}
                      initialReviewText={review.reviewText}
                    />
                  )}
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-black underline"
                  >
                    Eliminar reseña
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        
        {message && (
          <p
            className={`text-center font-semibold mt-4 px-4 py-2 rounded shadow-md ${
              message.type === "success"
                ? "text-green-700 bg-green-100 border border-green-300"
                : "text-red-700 bg-red-100 border border-red-300"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </>
  );
}

export default Reviews;
