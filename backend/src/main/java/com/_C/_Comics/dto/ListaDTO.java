package com._C._Comics.dto;

import com._C._Comics.models.PrivacidadEnum;

public class ListaDTO {

    private Integer id;
    private String titulo;
    private String descripcion;
    private PrivacidadEnum privacidad = PrivacidadEnum.publica;
    private UserDTO user;

    public ListaDTO(){

    }

    public ListaDTO(Integer id, String titulo, String descripcion, PrivacidadEnum privacidad, UserDTO user) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.privacidad = privacidad;
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public PrivacidadEnum getPrivacidad() {
        return privacidad;
    }

    public void setPrivacidad(PrivacidadEnum privacidad) {
        this.privacidad = privacidad;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
