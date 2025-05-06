package com._C._Comics.mappers;

import com._C._Comics.dto.ComentariosListaDTO;
import com._C._Comics.dto.ListaDTO;
import com._C._Comics.dto.UserDTO;
import com._C._Comics.models.ComentariosLista;
import com._C._Comics.models.Lista;

import java.util.List;

public class ComentariosMapper {

    public static ComentariosListaDTO convertToComentarioDTO (ComentariosLista comentariosLista){
        ListaDTO listaDTO = ListaMapper.toListaDTO(comentariosLista.getLista());
        UserDTO userDTO = UserMapper.toUserDTO(comentariosLista.getUser());
        return new ComentariosListaDTO(comentariosLista.getId(),listaDTO,userDTO,comentariosLista.getContenido(),comentariosLista.getFechaComentario());
    }
}
