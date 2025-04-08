package com._C._Comics.auth;

import com._C._Comics.jwt.JwtService;
import com._C._Comics.models.Role;
import com._C._Comics.models.RoleEnum;
import com._C._Comics.models.User;
import com._C._Comics.repository.RoleRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private JwtService jwtService;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository, JwtService jwtService,PasswordEncoder passwordEncoder,AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.passwordEncoder=passwordEncoder;
        this.authenticationManager=authenticationManager;
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getNick(),request.getPassword()));
        UserDetails user = userRepository.findByNick(request.getNick());
        String token = jwtService.getToken(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        return authResponse;
    }



    public AuthResponse register(RegisterRequest request) {

        Role role = roleRepository.findByNombre(RoleEnum.USER.name()).orElseThrow(() -> new RuntimeException("ROL USER NO ENCONTRADO"));
        User user = new User();
        user.setName(request.getName());
        user.setLastName(request.getLast_name());
        user.setEmail(request.getEmail());
        user.setNick(request.getNick());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setActive(true);
        user.setCreatedAt(Instant.now());

        userRepository.save(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtService.getToken(user));
        return authResponse;

    }
}
