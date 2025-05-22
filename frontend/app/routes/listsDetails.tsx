import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ComicsListForLists from "~/Components/ComicsListForLists";
import Comments from "~/Components/Comments";
import InputSearchList from "~/Components/InputSearchList";
import { useUser } from "~/Contexts/UserContext";
import { getComicListByListId, getCommentsListByListId } from "~/Services/functions";
import type { ComicDTO, ComicListResponse, SingleComment } from "~/Types/interfaces";



const ListDetails: React.FC = () => {
    const { id } = useParams();
    const { userId } = useUser();
    const [comics, setComics] = useState<ComicDTO[]>([]);
    const [title,setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [comments,setComments] = useState<SingleComment[]>([]);
    const [yours,setYours] = useState<boolean>(false);
    const [showInputSearch,setShowInputSearch] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchComics = async () => {
        try {
          if (!id) return;
          const response: ComicListResponse[] = await getComicListByListId(Number(id));
          const title = response.length >0 ? response[0].lista.titulo : 'Sin título';
          setTitle(title);
          const comments = await getCommentsListByListId(Number(id));
          setComments(comments);
          const comicsOnly = response.map((item) => item.comic);
          setComics(comicsOnly);

          if(response.length > 0 && response[0].lista.user.id === userId) {
            setYours(true);
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Error desconocido al cargar los cómics.');
          }
        }
      };
  
      fetchComics();
    }, [id]);

    const handleEditList = () => {
      setShowInputSearch(true);
    }

    const closeSearch = () =>{
      setShowInputSearch(false);
    }

    const addComicToState = (comic: ComicDTO) => {
      setComics((prevComics) => {
        if (prevComics.some(c => c.id === comic.id)) {
          return prevComics;
        }
        closeSearch();
        return [...prevComics, comic];
      });
    };

    
  
    return (
      <div className="min-h-screen px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-cyan-500 mb-6 text-center">
        {title}
        </h2>
        {error && (
          <p className="text-center text-red-500 font-medium mb-4">{error}</p>
        )}
  
        {comics.length > 0 ? (
          <>
          <ComicsListForLists comicsList={comics} />
          {yours && (
            <>
            <div className="flex justify-center">
            <button onClick={handleEditList}
            className="px-20 py-6 text-2xl text-white bg-cyan-500">Añade más cómics</button>
            </div>
            </>
          )}

          {showInputSearch && (
              <InputSearchList addComicToState = {addComicToState}></InputSearchList>
          )}
          <Comments comments={comments} ></Comments>
          </>
        ) : (
          <p className="text-center text-gray-400 text-lg">
            Esta lista aún no tiene cómics :(
          </p>
        )}
      </div>
    );
  };


export default ListDetails;