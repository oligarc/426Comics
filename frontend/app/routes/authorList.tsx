import React, { useEffect, useState } from "react";
import Authors from "~/Components/Authors";
import { getAllAuthors } from "~/Services/functions";
import type { AuthorDTO, Page } from "~/Types/interfaces";

function authorList() {
  const [authors, setAuthors] = useState<Page<AuthorDTO>>({
    content: [],
    pageable: { pageNumber: 0, pageSize: 3 },
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const fetchedAutors = await getAllAuthors(currentPage,4);
        setAuthors(fetchedAutors);
      } catch (error) {
        console.error("Error con los autores");
      }
    };

    fetchAuthors();
  }
  
  ,[currentPage]);

  const goToNextPage = () => {
    if (authors.pageable.pageNumber < authors.totalPages - 1) {
      setCurrentPage(authors.pageable.pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (authors.pageable.pageNumber > 0) {
      setCurrentPage(authors.pageable.pageNumber - 1);
    }
  };

  return(
    <>
  <Authors authors={authors.content}></Authors>
  <div className="pagination-controls text-center py-4">
        <button
          onClick={goToPreviousPage}
          disabled={authors.pageable.pageNumber === 0}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4">{`Página ${authors.pageable.pageNumber + 1} de ${authors.totalPages}`}</span>
        <button
          onClick={goToNextPage}
          disabled={authors.pageable.pageNumber === authors.totalPages - 1}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      </>
  );
}

export default authorList;
