import type { CommentsProps, SingleComment } from "~/Types/interfaces";
import CommentPost from "./CommentPost";
import { useUser } from "~/Contexts/UserContext";
import { postComment } from "~/Services/functions";
import { useState } from "react";

const Comments: React.FC<CommentsProps> = ({ comments }) => {

  const [commentList, setCommentList] = useState<SingleComment[]>(comments);
  const { userId, nick } = useUser();

  const handleSubmitReview = async (newCommentText: string) => {
    try {
      if (!userId) return;
      const listId = commentList[0]?.lista.id;
      const newComment = await postComment(listId, userId, newCommentText);
      console.log(newComment);
      newComment.user = {nick};
      setCommentList((prev) => [...prev, newComment]);
    } catch (error) {
      console.error("Error al añadir comentario:", error);
    }
  };
    return (
      <>
      <div className="bg-gray-100 py-4 px-3">
      <h2 className="text-3xl">Comentarios</h2>
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
                  {comment.user.nick}
                </p>
                <p className="text-lg text-gray-800">{comment.contenido}</p>
              </div>
            </div>
            <div className="text-right text-gray-500 text-sm">
              {new Date(comment.fechaComentario).toLocaleDateString("es-ES")}
            </div>
          </div>
          
        ))}
      </div>
      </div>
      </>
    );
  };

export default Comments;