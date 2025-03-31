package com._C._Comics.restController;

import com._C._Comics.dto.PublisherDTO;
import com._C._Comics.entity.Publisher;
import com._C._Comics.service.ServicePublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
public class PublisherRestController {
    private ServicePublisher servicePublisher;

    @Autowired
    public PublisherRestController(ServicePublisher v_servicePublisher){
        this.servicePublisher=v_servicePublisher;
    }

    @GetMapping("/")
    public List<PublisherDTO> getAllPublishers(){
        return servicePublisher.getAllPublishers();
    }

    @GetMapping("/name/{publisherName}")
    public List<PublisherDTO> getPublishersByName(@PathVariable String publisherName){
        return servicePublisher.getPublisherByName(publisherName);
    }

    @GetMapping("/postalCode/{postalCode}")
    public List<PublisherDTO> getPublishersByPostalCode(@PathVariable int postalCode){
        return servicePublisher.getPublishersByPostalCode(postalCode);
    }

    @GetMapping("/town/{town}")
    public List<PublisherDTO> getPublishersByTown(@PathVariable String town){
        return servicePublisher.getPublishersByTown(town);
    }

    @GetMapping("/province/{province}")
    public List<PublisherDTO> getPublishersByProvince(@PathVariable String province){
        return servicePublisher.getPublishersByProvince(province);
    }

    @PostMapping("/")
    public Publisher addPublisher(@RequestBody Publisher publisher){
        return servicePublisher.addPublisher(publisher);
    }

    @PutMapping("/{id}")
    public Publisher updatePublisher(@RequestBody Publisher publisher,@PathVariable int id){
        return servicePublisher.updatePublisher(publisher, id);
    }

    @DeleteMapping("/{id}")
    public void deletePublisher(@PathVariable int id){
        servicePublisher.deletePublisher(id);
    }
}
