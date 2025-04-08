package com._C._Comics.restController;

import com._C._Comics.service.ServiceUserCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/collection")
public class UserCollectionRestController {

    private ServiceUserCollection serviceUserCollection;

    @Autowired
    public UserCollectionRestController(ServiceUserCollection serviceUserCollection){
        this.serviceUserCollection=serviceUserCollection;
    }

    @PostMapping("/add/{comicId}/{nick}")
    public void addComic(@PathVariable int comicId,@PathVariable String nick){
        serviceUserCollection.addComicToUserCollection(comicId,nick);
    }
}
