import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ComicsList from '~/Components/ComicsList';
import { getComicsByPublisherId, getPublisherNameById } from '~/Services/functions';
import type { ComicDTO } from '~/Types/interfaces';

const publishersDetails : React.FC = () => {

    const { id } = useParams <{ id: string }>();
    const [comic, setComic] = useState<ComicDTO[]>([]);
    const [publisherName,setPublisherName] = useState<String>('');

    useEffect(() => {
        const fetchComicsByPublisherId = async () => {
            if(id){
                const publisherId = Number(id);
                if(!isNaN(publisherId)){
                    try{
                        const fetchedComics = await getComicsByPublisherId(publisherId);
                        setComic(fetchedComics);
                    }catch(error){
                        console.error("Error al obtener los comics de la editorial: ", error);
                    }
                }
            }
        };

        const fetchPublisherName = async () => {
            if(id){
                const publisherId = Number(id);
                if(!isNaN(publisherId)){
                    try{
                        const publisherName = await getPublisherNameById(publisherId);
                        setPublisherName(publisherName);
                    }catch(error){
                        console.error("Error al obtener el nombre de la editorial")
                    }
                }
            }
        }

        fetchComicsByPublisherId();
        fetchPublisherName();
        
    },[id]);

    

    return(
        <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold my-4 text-cyan-700">Cómics editados por : <span className='text-cyan-500'>{publisherName}</span></h2>
        <ComicsList comicsList={comic} />
      </div>
    )
}


export default publishersDetails