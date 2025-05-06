package com._C._Comics.repository;

import com._C._Comics.models.ComentariosLista;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComentariosListaRepository extends JpaRepository<ComentariosLista,Integer> {
    ComentariosLista findByIdAndLista_Id(Integer id, Integer listaId);
}
