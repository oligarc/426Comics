package com._C._Comics.restController;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.service.ServiceComic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private ServiceComic serviceComic;

    @Autowired
    public RestController(ServiceComic v_serviceComic){
        this.serviceComic=v_serviceComic;
    }

    @GetMapping("/comics")
    public List<ComicDTO> allComics(){
        return serviceComic.getAllComics();
    }

}
