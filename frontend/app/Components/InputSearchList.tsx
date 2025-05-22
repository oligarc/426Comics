import React, { useEffect, useState } from "react";
import { addComicToList, getComicByTitle } from "~/Services/functions";
import type { ComicDTO, InputSearchListProps } from "~/Types/interfaces";
import ComicsListAdded from "./ComicListAdded";
import { useParams } from "react-router";

const InputSearchList: React.FC<InputSearchListProps> = ({ addComicToState }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [comics,setComics] = useState<ComicDTO[]>([]);
  const [showComicList,setShowComicList] = useState<boolean>(false);

  const { id } = useParams(); //Has to be the exact name as defined in routes.ts, otherwise it'll be a NaN

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddComic = async (comic : ComicDTO) =>{
    try{
        await addComicToList(Number(id),comic.id);
        addComicToState(comic);
    }catch(error){
        console.error(error)
    }
  }


  useEffect(() => {
        const fetchData = async () => {
          if (searchQuery) {
            const results = await getComicByTitle(searchQuery);
            setComics(results);
          }
        };
        fetchData();
      }, [searchQuery]);

      const showComics = () => {
        setShowComicList(true);
      }

  return (
    <>
    <div
      className="flex justify-center items-center gap-2 my-8"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="¿Qué cómic has leído últimamente?"
        className="text-center border px-4 py-2 rounded-2xl shadow w-1/2 h-12"
      />
      <button
        onClick={showComics}
        className="bg-cyan-500 text-white px-4 rounded-2xl h-12 hover:bg-cyan-700 transition"
      >
        Buscar
      </button>
      </div>

      {showComicList && (
        <ComicsListAdded comicsList={comics} onAddComic={handleAddComic}></ComicsListAdded>
      )}

</>
    
  );
}

export default InputSearchList;