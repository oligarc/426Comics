import ComicsList from "~/Components/ComicsList";
import type { Route } from "./+types/home";
import InputSearch from "~/Components/InputSearch";
import { useEffect, useState } from "react";
import type { Page, ComicDTO } from "~/Types/interfaces";
import { getAllComics } from "~/Services/functions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "426Comics" },
    { name: "description", content: "Batman's Coming..." },
  ];
}

export default function Home() {

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
    const fetchComics = async () => {
      const data = await getAllComics(currentPage);
      setComics(data);
    };

    fetchComics();
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
  return(
    <div className="home-container bg-gray-50">
      <h1 className="text-center text-4xl text-cyan-500 py-10">¡Bienvenido a 426 Cómics!</h1>
      <h2 className="text-center text-2xl mt-6">¿Qué mejor que empezar con unos buenos cómics?</h2>
      <InputSearch />
      <ComicsList comicsList={comics?.content || []} />

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
  )
}
