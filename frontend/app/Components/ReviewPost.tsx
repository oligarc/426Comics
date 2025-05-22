import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import type {ReviewPostProps } from '~/Types/interfaces';

function ReviewPost({onSubmitReview, initialRating = 0,
  initialReviewText = "",}: ReviewPostProps) {

  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState(initialReviewText);

  useEffect(() => {
    setRating(initialRating);
    setReviewText(initialReviewText);
  }, [initialRating, initialReviewText]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(rating, reviewText);

    // Clean the form after sending it
    setRating(0);
    setReviewText('');
  };

  return (
    <div className=" mt-8 p-4 rounded">
      {initialReviewText ? <h2 className="text-2xl text-center mb-4 text-cyan-600 font-bold">Actualiza tu reseña</h2> : <h2 className="text-2xl text-center mb-4 text-cyan-600 font-bold">Añade tu reseña</h2>}
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none"
            >
              <FaStar
                className={`text-3xl ${
                  star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="mb-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Escribe aquí tu reseña..."
            className="w-full border rounded p-2 h-24 resize-none"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            {initialReviewText ? 'Actualizar' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewPost;
