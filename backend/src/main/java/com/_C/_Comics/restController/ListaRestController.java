package com._C._Comics.restController;

import com._C._Comics.dto.ListaDTO;
import com._C._Comics.models.Lista;
import com._C._Comics.service.ServiceLista;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lista")
public class ListaRestController {

    private ServiceLista serviceLista;

    @Autowired
    public ListaRestController(ServiceLista serviceLista){
        this.serviceLista=serviceLista;
    }

    @GetMapping("/all")
    public List<ListaDTO> getAllListas(){
        return serviceLista.getAllListas();
    }

    @GetMapping("/id/{id}")
    public ListaDTO getListaById(@PathVariable int id){
        return serviceLista.getListaById(id);
    }

    @GetMapping("/userId/{id}")
    public List<ListaDTO> getUserLista(@PathVariable int id){
        return serviceLista.getListasByUserId(id);
    }

    @PostMapping("/add")
    public void saveLista(@RequestBody Lista lista){
        serviceLista.saveList(lista);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLista(@PathVariable int id){
        serviceLista.deleteListaById(id);
    }
}
