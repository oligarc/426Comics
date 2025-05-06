package com._C._Comics.service;

import com._C._Comics.dto.ListaDTO;
import com._C._Comics.models.Lista;

import java.util.List;

public interface ServiceLista {

    public List<ListaDTO> getAllListas();
    public ListaDTO getListaById(int listaId);
    public void saveList(Lista lista);
    public void deleteListaById(int id);
    public List<ListaDTO> getListasByUserId(int userId);

}
