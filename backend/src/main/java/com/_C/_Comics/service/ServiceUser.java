package com._C._Comics.service;

import com._C._Comics.dto.UserDTO;
import com._C._Comics.models.User;

public interface ServiceUser {

    UserDTO getUserById(int id);
    UserDTO createUser(User user);
    UserDTO updateUser(int id, User user);
    UserDTO getCurrentUser();
    void deleteUser(int id);
    boolean validateUser(String nick,String password);

}
