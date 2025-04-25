import type {
  AuthorDTO,
  ComicDTO,
  Page,
  PublisherDTO,
} from "~/Types/interfaces";

const API_BASE_URL = "http://localhost:8080";

//Every API service is gonna be authenticated so this down here is deprecated
/*
const NICK = "oli699"; //Just use the user you have stored in the DataBase
const PASSWORD = "fun123";
*/

/* API COMICS FUNCTIONS */

export const getAllComics = async (
  page = 0,
  size = 12 //Works fine with my design
): Promise<Page<ComicDTO>> => {
  try {
    console.log("Getting comics...");
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/comics/?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the comics`);
    }

    const comics = await response.json();
    console.log("Comics obtained:", comics);
    return comics;
  } catch (error) {
    console.error("Error getting the comics:", error);
    return {
      content: [],
      pageable: { pageNumber: 0, pageSize: 12 },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
    };
  }
};

export const getComicById = async (comicId: number): Promise<ComicDTO> => {
  try {
    console.log("Getting comic by id");
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/comics/${comicId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the comic`);
    }
    const comic = await response.json();
    console.log("Comic obtained: ", comic);
    return comic;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComicByTitle = async (
  comicTitle: string
): Promise<ComicDTO[]> => {
  try {
    console.log("Getting comics by title");
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/comics/title/${comicTitle}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the comics`);
    }

    const comics = await response.json();
    return comics;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getComicsByPublisherId = async (
  publisherId: number,
  page: number = 0,
  size: number = 12
): Promise<Page<ComicDTO>> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/comics/publisherId/${publisherId}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the comics`);
    }

    const comics = await response.json();
    return comics;
  } catch (error) {
    console.error(error);
    return {
      content: [],
      pageable: { pageNumber: 0, pageSize: 12 },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
    };
  }
};

export const getComicsByAuthorName = async ( //Thinking of obtaining it by author id instead, much better idea
  authorName: string,
  page: number = 0,
  size: number = 12
): Promise<Page<ComicDTO>> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/comics/author/${authorName}?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the comics`);
    }

    const comics = await response.json();
    return comics;
  } catch (error) {
    console.error(error);
    return {
      content: [],
      pageable: { pageNumber: 0, pageSize: 12 },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
    };
  }
};

/* API COMICS FUNCTIONS */

/* API USERCOLLECTION FUNCTIONS */

export const addComicToCollection = async (comicId: number, userId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/collection/add/${comicId}/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Respuesta del servidor:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      throw new Error(
        `Error al añadir el cómic a la colección: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error en la petición:", error);
    if (error instanceof Error) {
      console.error("Error detallado:", error.message); // Si es un Error, muestra el mensaje detallado
    }
    throw error;
  }
};

export const removeComicFromCollection = async (
  comicId: number,
  userId: number
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/collection/delete/${comicId}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el cómic de la colección");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const hasTheUserTheComic = async (comicId: number, userId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/collection/has/${comicId}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const hasIt = await response.json();
    return hasIt;
  } catch (error) {
    console.error(error);
  }
};

/* API USERCOLLECTION FUNCTIONS */

/* API PUBLISHER FUNCTIONS */

export const getAllPublishers = async (): Promise<PublisherDTO[]> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/publishers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //"Authorization": "Basic " +btoa(`${NICK}:${PASSWORD}`),
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could't get the publishers`);
    }

    const publishers = await response.json();
    console.log("Publishers obtained:", publishers);
    return publishers;
  } catch (error) {
    console.error("Error getting the publishers: ", error);
    return [];
  }
};

export const getPublisherNameById = async (
  publisherId: number
): Promise<String> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/publishers/nameWithId/${publisherId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          //"Authorization": "Basic " + btoa(`${NICK}:${PASSWORD}`),
        },
      }
    );

    const publisherName = await response.text(); //As we are only waiting for a string
    return publisherName;
  } catch (error) {
    console.error(error);
    return "";
  }
};

/* API PUBLISHER FUNCTIONS */

/* API AUTHOR FUNCTIONS */

export const getAllAuthors = async (
  page: number,
  size: number
): Promise<Page<AuthorDTO>> => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/authors/?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Couldn't get the authors");
    }

    const authors = await response.json();
    return authors;
  } catch (error) {
    console.error("Error getting the authors");
    return {
      content: [],
      pageable: { pageNumber: 0, pageSize: 12 },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
    };
  }
};

/* API AUTHOR FUNCTIONS */
