package com._C._Comics.dto;

import java.time.Instant;

public class ComentariosListaDTO {

    private Integer id;
    private ListaDTO lista;
    private UserDTO user;
    private String contenido;
    private Instant fechaComentario;


    public ComentariosListaDTO(){

    }

    public ComentariosListaDTO(Integer id, ListaDTO lista, UserDTO user, String contenido,Instant fechaComentario) {
        this.id = id;
        this.lista = lista;
        this.user = user;
        this.contenido = contenido;
        this.fechaComentario=fechaComentario;
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

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Instant getFechaComentario() {
        return fechaComentario;
    }

    public void setFechaComentario(Instant fechaComentario) {
        this.fechaComentario = fechaComentario;
    }


}
