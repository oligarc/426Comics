import type { AuthorListProps } from "~/Types/interfaces";

const Authors : React.FC<AuthorListProps> = ({authors}) => {

    return (
        <div className="authors-container py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {authors.map((author) => (
                <>
                <img
                  src={author.photoUrl}
                  alt={`${author.name} ${author.lastName}`}
                  className="w-full h-74 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-cyan-600 truncate">{author.name}</h3>
                  <p className="text-gray-600 text-sm my-2">{author.biography}</p>
                </div>
                </>
            ))}
          </div>
        </div>
      );


}


export default Authors;