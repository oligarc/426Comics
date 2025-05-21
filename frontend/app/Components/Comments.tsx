import type { CommentsProps } from "~/Types/interfaces";

const Comments: React.FC<CommentsProps> = ({ comments }) => {
    return (
      <div className="comments-container py-8 px-4 space-y-8">
        {comments.map((comment) => (
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
    );
  };

export default Comments;