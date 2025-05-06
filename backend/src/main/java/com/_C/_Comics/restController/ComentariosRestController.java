package com._C._Comics.restController;

import com._C._Comics.dto.ComentariosListaDTO;
import com._C._Comics.models.ComentariosLista;
import com._C._Comics.service.ServiceComentariosLista;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
public class ComentariosRestController {

    private ServiceComentariosLista serviceComentariosLista;

    public ComentariosRestController(ServiceComentariosLista serviceComentariosLista){
        this.serviceComentariosLista=serviceComentariosLista;
    }

    @GetMapping("/get/{listaId}")
    public List<ComentariosListaDTO> getComentariosByListaId(@PathVariable int listaId){
        return serviceComentariosLista.getComentariosByListaId(listaId);
    }

    @PostMapping("/add")
    public void addComentario(@RequestBody ComentariosLista comentariosLista) {
        serviceComentariosLista.addComentario(comentariosLista.getLista().getId(),comentariosLista.getUser().getId(),comentariosLista.getContenido());
    }

    @DeleteMapping("/delete/{comentarioId}/{listaId}")
    public void deleteComentario(@PathVariable int comentarioId,
                                 @PathVariable int listaId) {
        serviceComentariosLista.deleteComentario(comentarioId, listaId);
    }

}
