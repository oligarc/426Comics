package com._C._Comics.service;

import com._C._Comics.dto.ListaComicDTO;
import com._C._Comics.mappers.ListaComicMapper;
import com._C._Comics.models.Comic;
import com._C._Comics.models.Lista;
import com._C._Comics.models.ListaComic;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.repository.ListaComicRepository;
import com._C._Comics.repository.ListaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceListaComicImpl implements ServiceListaComic{


    private ListaComicRepository listaComicRepository;
    private ListaRepository listaRepository;
    private ComicRepository comicRepository;

    public ServiceListaComicImpl (ListaComicRepository listaComicRepository, ListaRepository listaRepository, ComicRepository comicRepository){
        this.listaComicRepository=listaComicRepository;
        this.listaRepository=listaRepository;
        this.comicRepository=comicRepository;
    }


    @Override
    public List<ListaComicDTO> getAllListas() {
        List<ListaComic> listaComics = listaComicRepository.findAll();
        return listaComics.stream().map(ListaComicMapper::converToListaComicDTO).toList();
    }

    @Override
    public List<ListaComicDTO> getListaComicByListaId(int listaId) { //You have to pass the ListaId, no the ListaComicId
        List<ListaComic> listaComics = listaComicRepository.findByLista_Id(listaId);
        return listaComics.stream().map(ListaComicMapper::converToListaComicDTO).toList();
    }

    @Override
    public List<ListaComicDTO> getListasThatContainComic(int comicId) {
        List<ListaComic> listaComics = listaComicRepository.findByComic_Id(comicId);
        return listaComics.stream().map(ListaComicMapper::converToListaComicDTO).toList();
    }

    @Override
    public boolean isComicInList(int listaId, int comicId) {
        return listaComicRepository.existsByLista_IdAndComic_Id(listaId,comicId);
    }

    @Override
    public void addComic(int listaId, int comicId) {

        Lista lista = listaRepository.findById(listaId).orElseThrow(()-> new RuntimeException("No list with that id"));
        Comic comic = comicRepository.findById(comicId).orElseThrow(() -> new RuntimeException("No comic with that id"));

        ListaComic listaComic = new ListaComic();
        listaComic.setLista(lista);
        listaComic.setComic(comic);

        listaComicRepository.save(listaComic);

    }

    @Override
    public void deleteComic(int listaId, int comicId) {
        listaComicRepository.deleteByLista_IdAndComic_Id(listaId,comicId);
    }
}
