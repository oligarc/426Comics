import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { hasTheListTheComic, hasTheUserTheComic } from "~/Services/functions";
import type { ComicDTO, ComicsListAddedProps } from "~/Types/interfaces";

const ComicsListAdded: React.FC<ComicsListAddedProps> = ({
  comicsList,
  onAddComic,
}) => {
  //Need to make a state of a map with key comicId and value true or false
  const [userHasComic, setUserHasComic] = useState<{
    [comicId: number]: boolean;
  }>({});
  const { id } = useParams();
  useEffect(() => {
    const checkComics = async () => {
      const results: { [key: number]: boolean } = {};

      // Aquí haces un Promise.all para no hacerlo secuencial
      await Promise.all(
        comicsList.map(async (comic) => {
          const hasIt = await hasTheListTheComic(Number(id), comic.id);
          results[comic.id] = hasIt === true;
        })
      );

      setUserHasComic(results);
    };

    checkComics();
  }, [comicsList, Number(id)]);

  const handleAddComic = async (comic: ComicDTO) => {
    try {
      await onAddComic(comic);
      setUserHasComic((prev) => ({ ...prev, [comic.id]: true }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comics-container py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {comicsList.map((comic) => (
          <div
            key={comic.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <Link to={`/comicDetails/${comic.id}`}>
              <img
                src={comic.coverUrl}
                alt={comic.title}
                className="w-full h-74 object-contain mt-8"
              />
            </Link>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-cyan-600 truncate">
                {comic.title}
              </h3>
              <p className="text-gray-600 text-sm my-2">{comic.description}</p>
              <div className="flex justify-center mt-auto">
                <button
                  onClick={() => onAddComic(comic)}
                  className={`mb-2 px-8 py-3 text-white text-2xl ${
                    userHasComic[comic.id]
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-cyan-500 hover:bg-cyan-700"
                  }`}
                >
                  {userHasComic[comic.id] ? "✓ Añadido" : "+"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicsListAdded;
