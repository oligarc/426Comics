import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "426Comics" },
    { name: "description", content: "Batman's Coming..." },
  ];
}

export default function Home() {
}
