import type { ComicDTO, PublisherDTO } from "~/Types/interfaces";

const API_BASE_URL = "http://localhost:8080";

//Every API service is gonna be authenticated so this down here is deprecated
/*
const NICK = "oli699"; //Just use the user you have stored in the DataBase
const PASSWORD = "fun123";
*/

export const getAllComics = async (): Promise<ComicDTO[]> => {
    try {
        console.log("Getting comics...");
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/comics/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Could't get the comics`);
        }

        const comics = await response.json();
        console.log("Comics obtained:", comics);
        return comics;
    } catch (error) {
        console.error("Error getting the comics:", error);
        return [];
    }
};

export const getComicById = async (comicId:number): Promise<ComicDTO> => {
    try{
        console.log("Getting comic by id");
        const response = await fetch(`${API_BASE_URL}/api/comics/${comicId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
            },
        });

        if(!response.ok){
            throw new Error(`Error ${response.status}: Could't get the comic`)
        }
        const comic = await response.json();
        console.log("Comic obtained: ", comic);
        return comic;
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const getComicByTitle = async (comicTitle:string): Promise<ComicDTO[]> => {

    try {

        console.log("Getting comics by title");
        const response = await fetch(`${API_BASE_URL}/api/comics/title/${comicTitle}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
            },
        });

        if(!response.ok){
            throw new Error(`Error ${response.status}: Could't get the comics`)
        }

        const comics = await response.json();
        return comics;
        
    } catch (error) {
        console.error(error);
        return [];
    }

}

export const getComicsByPublisherId = async (publisherId : number) : Promise<ComicDTO[]> =>{
    
    try{

        const response = await fetch (`${API_BASE_URL}/api/comics/publisherId/${publisherId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
            },
    });

    if(!response.ok){
        throw new Error(`Error ${response.status}: Could't get the comics`)
    }

    const comics = await response.json();
    return comics;

    }catch(error){
        console.error(error);
        return [];
    }
}

export const getPublisherNameById = async (publisherId : number) : Promise<String> => {
    try{

        const response = await fetch (`${API_BASE_URL}/api/publishers/nameWithId/${publisherId}`, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
            },
    });

    const publisherName = await response.text(); //As we are only waiting for a string
    return publisherName;
        
        
    }catch(error){
        console.error(error);
        return "";
    }
}

export const getAllPublishers = async () : Promise<PublisherDTO[]> => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/publishers/`, {
            method: "GET",
            headers : {
                "Content-Type": "application/json",
                //"Authorization": "Basic " +btoa(`${NICK}:${PASSWORD}`),
            },
        });

        if(!response.ok){
            throw new Error(`Error ${response.status}: Could't get the publishers`)
        }

        const publishers = await response.json();
        console.log("Publishers obtained:", publishers);
        return publishers;
    }catch(error){
        console.error("Error getting the publishers: ", error);
        return [];
    }
}


