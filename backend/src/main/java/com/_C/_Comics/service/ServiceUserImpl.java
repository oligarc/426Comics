package com._C._Comics.service;

import com._C._Comics.dto.UserDTO;
import com._C._Comics.entity.User;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceUserImpl implements ServiceUser {

    private UserRepository userRepository;
    public ServiceUserImpl(UserRepository v_userRepository){
        this.userRepository=v_userRepository;
    }

    @Override
    public UserDTO getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow( () -> new RuntimeException("There's no user with that id"));
        return convertToUserDTO(user);
    }

    private UserDTO convertToUserDTO(User user){
        return new UserDTO(user.getId(),user.getNick());
    }
}
