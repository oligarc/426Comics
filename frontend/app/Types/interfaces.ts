export interface Page<T> {
    content: T[];          // T is a generic Type
    pageable: {
      pageNumber: number;  
      pageSize: number;    
    };
    totalElements: number; 
    totalPages: number;    
    last: boolean;        
    first: boolean;        
  }

export interface ComicDTO{
    id:number,
    title:string,
    launchDate: string,
    price:number,
    stock:number,
    isbn:string,
    coverUrl:string,
    description:string,
    pageCount:number,
    collectionVolume:number,
    authorDTO:AuthorDTO,
    publisherDTO:PublisherDTO,
    reviewDTO:ReviewDTO[],
    collection:boolean
}

export interface AuthorDTO{
    id:number,
    name:string,
    lastName:string,
    nationality:string,
    birthDate:string,
    deathDate:string | null,
    biography:string | null,
    photoUrl:string ,
    drawer:boolean,
    scriptwriter:boolean
}

export interface PublisherDTO{
    id:number,
    name:string,
    websiteUrl:string,
    businessPlace:string,
    postalCode:number,
    town:string,
    province:string,
    telephone:string,
    logoUrl:string
}

export interface ComicListProps{
    comicsList : ComicDTO [];
}

export interface ComicsListAddedProps {
  comicsList: ComicDTO[];
  onAddComic: (comic: ComicDTO) => void;
}

export interface InputSearchListProps{
  addComicToState: (comic: ComicDTO) => void;
}

export interface AuthorListProps{
    authors : AuthorDTO [];
}

export interface ReviewDTO{
    id:number,
    rating:number,
    reviewText:string,
    userDTO: UserDTO,
    reviewedAt:string,
    lastUpdatedAt:string
}

export interface UserDTO{
    id:number,
    nick:string
}

export interface ReviewProps{
    reviews: ReviewDTO[]
}

export interface ReviewPostProps {
    onSubmitReview: (rating: number, text: string) => void;
    initialRating?: number;
    initialReviewText?: string;
  }

export interface CommentPostProps{
  onSubmitReview: (contenido: string) => void;
}


export interface ListDTO {
    id: number;
    titulo: string;
    descripcion: string;
    privacidad: string;
    user: {
      id: number;
      nick: string;
    };
  }

export interface ComicListResponse {
    id: number;
    lista: {
      id: number;
      titulo: string;
      descripcion: string;
      privacidad: string;
      user: {
        id: number;
        nick: string;
      };
    };
    comic: ComicDTO;
  };

  export interface SingleComment{
    id:number;
    lista: {
      id: number;
      titulo: string;
      descripcion: string;
      privacidad: string;
      user: {
        id: number;
        nick: string;
      };
    };
    user: {
      id: number;
      nick: string;
    };
    contenido:string,
    fechaComentario:string;
  }

  export interface CommentsProps{
    comments: SingleComment[];
  }
  