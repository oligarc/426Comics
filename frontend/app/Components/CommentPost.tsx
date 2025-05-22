import React, {useState } from 'react';
import type { CommentPostProps } from '~/Types/interfaces';

function CommentPost({onSubmitReview}: CommentPostProps) {
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const showTemporaryMessage = (
    text: string,
    type: "success" | "error" = "success" //In fact type over here is always gonna be success
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(reviewText);
    showTemporaryMessage("Comentario añadido con éxito.")

    // Clean the form after sending it
    setReviewText('');
  };

  return (
    <div className=" mt-8 p-4 rounded">
     <h2 className="text-2xl text-center mb-4 text-cyan-600 font-bold">Añade un comentario</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
        </div>
        <div className="mb-4">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full border rounded p-2 h-24 resize-none"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
          >
            Comentar
          </button>

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
      </form>
    </div>
  );
}

export default CommentPost;
