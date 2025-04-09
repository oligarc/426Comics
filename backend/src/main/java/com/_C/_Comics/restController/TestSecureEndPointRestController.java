package com._C._Comics.restController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prueba")
public class TestSecureEndPointRestController {

    @PostMapping("/saludo")
    public String welcome(){
        return "Hola!";
    }
}
