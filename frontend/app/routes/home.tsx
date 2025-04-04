import ComicsList from "~/Components/ComicsList";
import type { Route } from "./+types/home";
import InputSearch from "~/Components/InputSearch";
import { useEffect, useState } from "react";
import type { ComicDTO } from "~/Types/interfaces";
import { getAllComics } from "~/Services/functions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "426Comics" },
    { name: "description", content: "Batman's Coming..." },
  ];
}

export default function Home() {

  const [comics, setComics] = useState<ComicDTO[]>([]);

  useEffect(() => {
    const fetchComics = async () => {
      const data = await getAllComics();
      setComics(data);
    };

    fetchComics();
  }, []);
  return(
    <div className="home-container bg-gray-50">
      <h1 className="text-center text-4xl text-cyan-500 py-10">¡Bienvenido a 426 Cómics!</h1>
      <h2 className="text-center text-2xl mt-6">¿Qué mejor que empezar con unos buenos cómics?</h2>
      <InputSearch />
      <ComicsList comicsList={comics} />
    </div>
  )
}
