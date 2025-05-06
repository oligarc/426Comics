package com._C._Comics.service;

import com._C._Comics.dto.ComentariosListaDTO;

import java.util.List;

public interface ServiceComentariosLista {

    List<ComentariosListaDTO> getComentariosByListaId(int listaId);
    public void addComentario(int listaId,int userId,String contenido);
    public void deleteComentario(int listaId,int comentarioId);
}
