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

    @Override
    public UserDTO createUser(User user) {

        User savedUser = userRepository.save(user);
        return convertToUserDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(int id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));

        existingUser.setName(user.getName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setNick(user.getNick());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());

        User updatedUser = userRepository.save(existingUser);
        return convertToUserDTO(updatedUser);
    }

    @Override
    public void deleteUser(int id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
        userRepository.delete(existingUser);
    }



    private UserDTO convertToUserDTO(User user){
        return new UserDTO(user.getId(),user.getNick());
    }
}
