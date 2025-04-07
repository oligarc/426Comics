import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllComics } from "~/Services/functions";
import type { ComicDTO, ComicListProps } from "~/Types/interfaces";

const ComicsList: React.FC<ComicListProps> = ({comicsList}) => {

 /* const [comics, setComics] = useState<ComicDTO[]>([]);

  useEffect(() => {
    const fetchComics = async () => {
      const data = await getAllComics();
      setComics(data);
    };

    fetchComics();
  }, []);

  */

  return (
    <div className="comics-container py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {comicsList.map((comic) => (
          <Link to={`/comicDetails/${comic.id}`} key={comic.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={comic.coverUrl}
              alt={comic.title}
              className="w-full h-74 object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-cyan-600 truncate">{comic.title}</h3>
              <p className="text-gray-600 text-sm my-2">{comic.description}</p>
              <p className="text-lg font-semibold text-gray-900">{comic.price}€</p>
             {/* Just in case I come up with something {comic.collection ? `Número de colección ${comic.collectionVolume}` : ''}*/} 
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComicsList;
