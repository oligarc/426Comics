package com._C._Comics.restController;

import com._C._Comics.dto.ListaComicDTO;
import com._C._Comics.service.ServiceListaComic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listaComic")
public class ListaComicRestController {

    private ServiceListaComic serviceListaComic;

    @Autowired
    public ListaComicRestController(ServiceListaComic serviceListaComic){
        this.serviceListaComic=serviceListaComic;
    }

    @GetMapping("/")
    public List<ListaComicDTO> getAll(){
        return serviceListaComic.getAllListas();
    }

    @GetMapping("/listId/{id}")
    public List<ListaComicDTO> getListById(@PathVariable int id){
        return serviceListaComic.getListaComicByListaId(id);
    }

    @GetMapping("/comicId/{id}")
    public List<ListaComicDTO> getListByComicId(@PathVariable int id){
        return serviceListaComic.getListasThatContainComic(id);
    }

    @GetMapping("/exists/{listId}/{comicId}")
    public boolean exists(@PathVariable int listId, @PathVariable int comicId){
        return serviceListaComic.isComicInList(listId,comicId);
    }

    @PostMapping("/add/{listId}/{comicId}")
    public void addComic(@PathVariable int listId, @PathVariable int comicId){
        serviceListaComic.addComic(listId,comicId);
    }

    @DeleteMapping("/delete/{listId}/{comicId}")
    public void deleteComic(@PathVariable int listId, @PathVariable int comicId){
        serviceListaComic.deleteComic(listId,comicId);
    }
}
