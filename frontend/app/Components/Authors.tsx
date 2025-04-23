import { Link } from "react-router";
import type { AuthorListProps } from "~/Types/interfaces";

const Authors : React.FC<AuthorListProps> = ({authors}) => {

    return (
        <div className="authors-container py-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {authors.map((author) => (
                <>
                <Link to={`/authorComics/${author.name}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={author.photoUrl}
                  alt={`${author.name} ${author.lastName}`}
                  className="w-full h-96 object-contain mt-8"
                />
                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-cyan-600 truncate">{author.name} {author.lastName}</h3>
                  <p className="text-gray-600 text-lg my-2">{author.biography}</p>
                  <p className="text-gray-600 text-lg my-2">Nacionalidad: {author.nationality}</p>
                  <p className="text-gray-600 text-lg my-2">Fecha de nacimiento: {author.birthDate}</p>
                  {author.deathDate && (
                    <p className="text-gray-600 text-lg my-2">Fecha de fallecimiento: {author.deathDate}</p>
                  )}
                </div>
                </div>
                </Link>
                </>
            ))}
          </div>
        </div>
      );


}


export default Authors;