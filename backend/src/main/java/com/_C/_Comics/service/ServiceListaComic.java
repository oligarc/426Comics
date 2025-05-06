package com._C._Comics.service;

import com._C._Comics.dto.ListaComicDTO;
import com._C._Comics.dto.ListaDTO;

import java.util.List;

public interface ServiceListaComic {

    public List<ListaComicDTO> getAllListas();
    public List<ListaComicDTO> getListaComicByListaId(int listaId);
    public List<ListaComicDTO> getListasThatContainComic(int comicId);
    public void addComic(int listaId, int comicId);
    public void deleteComic(int listaId,int comicId);
}
