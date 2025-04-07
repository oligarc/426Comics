package com._C._Comics.restController;

import com._C._Comics.seguridad.JwtAuthenticationResponse;
import com._C._Comics.seguridad.JwtTokenProvider;
import com._C._Comics.service.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthRestController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private ServiceUser serviceUser;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String,String> credentials){

        String nick = credentials.get("nick");
        String password = credentials.get("password");

        if(serviceUser.validateUser(nick,password)){
            String token = jwtTokenProvider.createToken(nick);
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));
        }else{
            return ResponseEntity.status(401).body("Credenciales invalidas");
        }
    }

}
