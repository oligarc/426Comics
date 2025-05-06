package com._C._Comics.mappers;

import com._C._Comics.dto.ListaDTO;
import com._C._Comics.dto.UserDTO;
import com._C._Comics.models.Lista;
import com._C._Comics.models.User;

public class ListaMapper {

    public static ListaDTO toListaDTO(Lista lista){
        if (lista == null) return null;
        User user = lista.getUser();
        UserDTO userDTO = UserMapper.toUserDTO(user);
        return new ListaDTO(lista.getId(),lista.getTitulo(),lista.getDescripcion(),lista.getPrivacidad(),userDTO);
    }
}
