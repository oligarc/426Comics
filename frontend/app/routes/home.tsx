import ComicsList from "~/Components/ComicsList";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "426Comics" },
    { name: "description", content: "Batman's Coming..." },
  ];
}

export default function Home() {
  return(
    <div className="home-container">
      <h1>Bienvenido a 426 Cómics</h1>
      <ComicsList />
    </div>
  )
}
