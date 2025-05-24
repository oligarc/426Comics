import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ComicsList from "~/Components/ComicsList";
import InputSearch from "~/Components/InputSearch";
import NoResults from "~/Components/NoResults";
import { getComicByTitle } from "~/Services/functions";
import type { ComicDTO } from "~/Types/interfaces";

const SearchResults = () => {
    const { title } = useParams<{ title: string }>();
    const [comics, setComics] = useState<ComicDTO[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        if (title) {
          const results = await getComicByTitle(title);
          setComics(results);
        }
      };
      fetchData();
    }, [title]);
  
    return (
      <div className="container mx-auto px-4">
        <InputSearch />
        <h2 className="text-2xl font-bold my-4">Resultados para la búsqueda: {title}</h2>
        {comics.length>0 ? 
        <ComicsList comicsList={comics} /> : 
        <NoResults searchQuery={title!}></NoResults>

      }
        
      </div>
    );
  };
  
  export default SearchResults;