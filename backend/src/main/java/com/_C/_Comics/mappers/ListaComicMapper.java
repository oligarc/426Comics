package com._C._Comics.mappers;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.dto.ListaComicDTO;
import com._C._Comics.dto.ListaDTO;
import com._C._Comics.models.ListaComic;

public class ListaComicMapper {

    public static ListaComicDTO converToListaComicDTO(ListaComic listaComic){

        if(listaComic == null) return null;
        ListaDTO listaDTO = ListaMapper.toListaDTO( listaComic.getLista());
        ComicDTO comicDTO = ComicMapper.converToComicDTO(listaComic.getComic());
        return new ListaComicDTO(listaComic.getId(),listaDTO,comicDTO);
    }
}
