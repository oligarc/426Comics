import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ComicsList from "~/Components/ComicsList";
import { getComicsByPublisherId, getPublisherNameById } from "~/Services/functions";

import type { Page, ComicDTO } from "~/Types/interfaces";

const publishersDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
  const [publisherName, setPublisherName] = useState<String>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchComicsByPublisherId = async () => {
      if (id) {
        const publisherId = Number(id);
        if (!isNaN(publisherId)) {
          try {
            const fetchedComics = await getComicsByPublisherId(publisherId,currentPage);
            setComics(fetchedComics);
          } catch (error) {
            console.error(
              "Error al obtener los comics de la editorial: ",
              error
            );
          }
        }
      }
    };

    const fetchPublisherName = async () => {
      if (id) {
        const publisherId = Number(id);
        if (!isNaN(publisherId)) {
          try {
            const publisherName = await getPublisherNameById(publisherId);
            setPublisherName(publisherName);
          } catch (error) {
            console.error("Error al obtener el nombre de la editorial");
          }
        }
      }
    };

    fetchComicsByPublisherId();
    fetchPublisherName();
  }, [id,currentPage]);

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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-4 text-cyan-700">
        Cómics editados por :{" "}
        <span className="text-cyan-500">{publisherName}</span>
      </h2>
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
};

export default publishersDetails;
