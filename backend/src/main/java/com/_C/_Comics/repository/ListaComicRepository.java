package com._C._Comics.repository;

import com._C._Comics.models.ListaComic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListaComicRepository extends JpaRepository<ListaComic,Integer> {
    List<ListaComic> findByLista_Id(Integer listaId);

    List<ListaComic> findByComic_Id(Integer comicId);

    void deleteByLista_IdAndComic_Id(Integer listaId, Integer comicId);

    boolean existsByLista_IdAndComic_Id(Integer listaId, Integer comicId);
}
