package com._C._Comics.dto;

public class ListaComicDTO {

    private Integer id;
    private ListaDTO lista;
    private ComicDTO comic;

    public ListaComicDTO(){

    }

    public ListaComicDTO(Integer id, ListaDTO lista, ComicDTO comic) {
        this.id = id;
        this.lista = lista;
        this.comic = comic;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ListaDTO getLista() {
        return lista;
    }

    public void setLista(ListaDTO lista) {
        this.lista = lista;
    }

    public ComicDTO getComic() {
        return comic;
    }

    public void setComic(ComicDTO comic) {
        this.comic = comic;
    }
}
