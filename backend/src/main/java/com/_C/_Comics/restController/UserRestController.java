package com._C._Comics.restController;

import com._C._Comics.dto.UserDTO;
import com._C._Comics.models.User;
import com._C._Comics.service.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    private ServiceUser serviceUser;

    @Autowired
    public UserRestController(ServiceUser v_serviceUser){
        this.serviceUser=v_serviceUser;
    }

    //These ones are gonna be with ResponseEntity just for knowdlege but later are gonna be configured as exceptions in its methods before reaching the controller

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
        UserDTO userDTO = serviceUser.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody User user) {
        UserDTO userDTO = serviceUser.createUser(user);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable int id, @RequestBody User user) {
        UserDTO userDTO = serviceUser.updateUser(id, user);
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        serviceUser.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


}
