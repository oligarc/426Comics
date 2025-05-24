import type { CommentsProps, SingleComment } from "~/Types/interfaces";
import CommentPost from "./CommentPost";
import { useUser } from "~/Contexts/UserContext";
import { deleteComment, postComment } from "~/Services/functions";
import { useState } from "react";

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [commentList, setCommentList] = useState<SingleComment[]>(comments);
  const { userId, nick } = useUser();
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const showTemporaryMessage = (
    text: string,
    type: "success" | "error" = "success" //In fact type over here is always gonna be success
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmitReview = async (newCommentText: string) => {
    try {
      if (!userId) return;
      const listId = commentList[0]?.lista.id;
      const newComment = await postComment(listId, userId, newCommentText);
      console.log(newComment);
      newComment.user = { nick };
      setCommentList((prev) => [...prev, newComment]);
    } catch (error) {
      console.error("Error al añadir comentario:", error);
    }
  };

  const handleDeleteComment = async (comentarioId: number, listaId: number) => {
    try {
      await deleteComment(comentarioId, listaId);
      setCommentList((prevComments) =>
        prevComments.filter((comment) => comment.id !== comentarioId)
      );
      showTemporaryMessage("Comentario eliminado.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 py-4 px-3">
        <h2 className="text-3xl">Comentarios</h2>
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
        <CommentPost onSubmitReview={handleSubmitReview}></CommentPost>
        <div className="comments-container py-8 px-4 space-y-8">
          {commentList.map((comment) => (
            <div
              key={comment.id}
              className="flex justify-between items-center gap-3 border-b pb-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src="/avatarplaceholder.png"
                  alt="placeholder"
                  className="rounded w-20"
                />
                <div>
                  <p className="text-2xl text-cyan-700 font-bold">
                    {comment.user.nick}{" "}
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.fechaComentario).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </p>
                  <p className="text-lg text-gray-800">{comment.contenido}</p>
                </div>
              </div>

              {comment.user.id === userId && (
                  <button
                    onClick={() =>
                      handleDeleteComment(comment.id, comment.lista.id)
                    }
                    className="text-black underline"
                  >
                    Eliminar comentario
                  </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
