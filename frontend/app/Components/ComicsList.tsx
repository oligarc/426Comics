import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import type {ComicListProps } from "~/Types/interfaces";

const ComicsList: React.FC<ComicListProps> = ({comicsList}) => {

  return (
    <div className="comics-container py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {comicsList.map((comic) => (
          <Link
            to={`/comicDetails/${comic.id}`}
            key={comic.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={comic.coverUrl}
              alt={comic.title}
              className="w-full h-74 object-contain mt-8"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-cyan-600 truncate">{comic.title}</h3>
              <p className="text-gray-600 text-sm my-2">{comic.description}</p>
              <p className="text-lg font-semibold text-gray-900">{comic.price}€</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComicsList;
