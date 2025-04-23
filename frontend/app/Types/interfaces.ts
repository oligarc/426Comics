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
    reviewDTO:any[],
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

export interface AuthorListProps{
    authors : AuthorDTO [];
}

//Need to configure the other interfaces