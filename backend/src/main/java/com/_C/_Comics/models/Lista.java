package com._C._Comics.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import org.hibernate.annotations.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lista", schema = "comics_db")
public class Lista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Lob
    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "privacidad", nullable = false)
    private PrivacidadEnum privacidad = PrivacidadEnum.publica;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "lista")
    private List<ComentariosLista> comentariosListas = new ArrayList<>();

    @OneToMany(mappedBy = "lista")
    private List<ListaComic> listaComics = new ArrayList<>();

    public List<ListaComic> getListaComics() {
        return listaComics;
    }

    public void setListaComics(List<ListaComic> listaComics) {
        this.listaComics = listaComics;
    }

    public List<ComentariosLista> getComentariosListas() {
        return comentariosListas;
    }

    public void setComentariosListas(List<ComentariosLista> comentariosListas) {
        this.comentariosListas = comentariosListas;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

}