import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useUser } from "~/Contexts/UserContext";
import { deleteReview, postReview, updateReview } from "~/Services/functions";
import type { ReviewDTO } from "~/Types/interfaces";
import ReviewPost from "./ReviewPost";

function Reviews({
  reviews,
}: {
  reviews: ReviewDTO[];
}) {
  const { userId } = useUser();
  const [reviewList, setReviewList] = useState(reviews);
  const [isEditReviewSelected, setIsEditReviewSelected] = useState(false);
  const [editReview, setEditReview] = useState<ReviewDTO | null>(null); // Those are gonna be here for next edit function

  

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviewList((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditReview = async () => {
    return "to-do";
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
            <>
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
                        <FaStar key={i} className="text-yellow-400 text-xl" /> //Don't know why that error, but it's working
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
                <>
                  <div className="flex justify-between ms-24">
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
                      <ReviewPost onSubmitReview={handleEditReview} />
                    )}

                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-black underline"
                    >
                      Eliminar reseña
                    </button>
                  </div>
                </>
              )}
            </>
          ))
        )}
      </div>
    </>
  );
}

export default Reviews;
