package com._C._Comics.service;

import com._C._Comics.dto.ListaDTO;
import com._C._Comics.mappers.ListaMapper;
import com._C._Comics.models.Lista;
import com._C._Comics.models.User;
import com._C._Comics.repository.ListaRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ServiceListaImpl implements ServiceLista{

    private ListaRepository listaRepository;
    private UserRepository userRepository;

    public ServiceListaImpl (ListaRepository listaRepository,UserRepository userRepository){
        this.listaRepository=listaRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<ListaDTO> getAllListas() {
        List<Lista> listas = listaRepository.findAll();
        return listas.stream().map(ListaMapper::toListaDTO).toList();
    }

    @Override
    public ListaDTO getListaById(int listaId) {
        Lista lista = listaRepository.findById(listaId).orElseThrow(()-> new RuntimeException("No list with that id"));
        return ListaMapper.toListaDTO(lista);
    }

    @Override
    public void saveList(Lista lista) {
        listaRepository.save(lista);
    }

    @Override
    public void deleteListaById(int id) {
        Lista lista = listaRepository.findById(id).orElseThrow(()-> new RuntimeException("No list with that id"));
        listaRepository.delete(lista);

    }

    @Override
    public List<ListaDTO> getListasByUserId(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("No user with that id"));
        List<Lista> lista = listaRepository.findByUser(user);
        return lista.stream().map(ListaMapper::toListaDTO).toList();
    }
}
