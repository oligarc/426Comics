package com._C._Comics.service;

import com._C._Comics.dto.ComentariosListaDTO;
import com._C._Comics.mappers.ComentariosMapper;
import com._C._Comics.models.ComentariosLista;
import com._C._Comics.models.Lista;
import com._C._Comics.models.User;
import com._C._Comics.repository.ComentariosListaRepository;
import com._C._Comics.repository.ListaRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceComentariosListaImpl implements ServiceComentariosLista{


    private ComentariosListaRepository comentariosListaRepository;
    private UserRepository userRepository;
    private ListaRepository listaRepository;

    public ServiceComentariosListaImpl(ComentariosListaRepository comentariosListaRepository, UserRepository userRepository,ListaRepository listaRepository){
        this.comentariosListaRepository=comentariosListaRepository;
        this.userRepository=userRepository;
        this.listaRepository=listaRepository;
    }

    @Override
    public List<ComentariosListaDTO> getComentariosByListaId(int listaId) {
        List<ComentariosLista> comentarios = comentariosListaRepository.findAll();
        return comentarios.stream().map(ComentariosMapper::convertToComentarioDTO).toList();
    }

    @Override
    public void addComentario(int listaId, int userId, String contenido) {

        Lista lista = listaRepository.findById(listaId)
                .orElseThrow(() -> new RuntimeException("Lista no encontrada con ID: " + listaId));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        ComentariosLista comentario = new ComentariosLista();
        comentario.setLista(lista);
        comentario.setUser(user);
        comentario.setContenido(contenido);

        comentariosListaRepository.save(comentario);

    }

    @Override
    public void deleteComentario(int comentarioId, int listaId) {
        ComentariosLista comentario = comentariosListaRepository.findByIdAndLista_Id(comentarioId,listaId);
        comentariosListaRepository.delete(comentario);

    }
}
