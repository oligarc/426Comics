package com._C._Comics.mappers;

import com._C._Comics.dto.UserDTO;
import com._C._Comics.models.User;

public class UserMapper {

    public static UserDTO toUserDTO(User user){
        if(user == null) return null;
        return new UserDTO(user.getId(),user.getNick());
    }
}
