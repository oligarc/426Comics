import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ComicsList from "~/Components/ComicsList";
import { getComicsByAuthorName } from "~/Services/functions";
import type { ComicDTO, Page } from "~/Types/interfaces";

function authorComics() {
  const { authorName } = useParams<{ authorName: string }>();
  const [comics, setComics] = useState<Page<ComicDTO>>({
    content: [],
    pageable: { pageNumber: 0, pageSize: 3 },
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
  });

  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchComicsByAuthorName = async () => {
      try {
        if (authorName) {
          const fetchedComics = await getComicsByAuthorName(
            authorName,
            currentPage,
            8
          );
          setComics(fetchedComics);
        }
      } catch (error) {
        console.error("Error con los cómics de los autores");
      }
    };
    fetchComicsByAuthorName();
  }, [authorName, currentPage]);

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
    <>
      <ComicsList comicsList={comics.content}></ComicsList>

      <div className="pagination-controls text-center py-4">
        <button
          onClick={goToPreviousPage}
          disabled={comics.pageable.pageNumber === 0}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4">{`Página ${comics.pageable.pageNumber + 1} de ${
          comics.totalPages
        }`}</span>
        <button
          onClick={goToNextPage}
          disabled={comics.pageable.pageNumber === comics.totalPages - 1}
          className="px-4 py-2 bg-cyan-600 text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </>
  );
}

export default authorComics;
