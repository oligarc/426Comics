import React, { useEffect, useState } from "react";
import ComicsList from "~/Components/ComicsList";
import { useUser } from "~/Contexts/UserContext";
import { comicsFromUser } from "~/Services/functions";
import type { ComicDTO, Page } from "~/Types/interfaces";

function comicCollection() {
  const { userId } = useUser();

  const [comics, setComics] = useState<Page<ComicDTO>>({
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 12,
      },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
    });
  
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const fetchLibrary= async () => {
          const data = await comicsFromUser(userId!);
          setComics(data);
        };
    
        fetchLibrary();
      }, [currentPage]);
    
      const goToNextPage = () => {
        if (comics.pageable.pageNumber < comics.totalPages - 1) {
          setCurrentPage(comics.pageable.pageNumber + 1);
        }
      };
    
      const goToPreviousPage = () => {
        if (comics.pageable.pageNumber > 0) {
          setCurrentPage(comics.pageable.pageNumber - 1);
        }
      };

  return (
    <div>
      <h2 className="text-6xl text-center text-cyan-600 font-bold">Tu biblioteca</h2>
      <ComicsList comicsList={comics.content} />
      <div className="pagination-controls text-center py-4">
        <button
          onClick={goToPreviousPage}
          disabled={comics.pageable.pageNumber === 0}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4">{`Página ${comics.pageable.pageNumber + 1} de ${comics.totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={comics.pageable.pageNumber === comics.totalPages - 1}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default comicCollection;
