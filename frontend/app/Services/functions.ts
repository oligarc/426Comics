import type { ComicDTO, PublisherDTO } from "~/Types/interfaces";

const API_BASE_URL = "http://localhost:8080";

const NICK = "oli699"; //Just use the user you have stored in the DataBase
const PASSWORD = "fun123";

export const getAllComics = async (): Promise<ComicDTO[]> => {
    try {
        console.log("Getting comics...");

        const response = await fetch(`${API_BASE_URL}/api/comics/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`), // Basic Auth, maybe implement JWT?
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
                "Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
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

export const getAllPublishers = async () : Promise<PublisherDTO[]> => {
    try{
        const response = await fetch(`${API_BASE_URL}/api/publishers/`, {
            method: "GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Basic " +btoa(`${NICK}:${PASSWORD}`),
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
