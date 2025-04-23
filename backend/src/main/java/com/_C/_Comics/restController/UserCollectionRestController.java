package com._C._Comics.restController;

import com._C._Comics.service.ServiceUserCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/collection")
public class UserCollectionRestController {

    private ServiceUserCollection serviceUserCollection;

    @Autowired
    public UserCollectionRestController(ServiceUserCollection serviceUserCollection){
        this.serviceUserCollection=serviceUserCollection;
    }

    @PostMapping("/add/{comicId}/{userId}")
    public void addComic(@PathVariable int comicId,@PathVariable int userId){
        serviceUserCollection.addComicToUserCollection(comicId,userId);
    }

    @GetMapping("/has/{comicId}/{userId}")
    public boolean hasComic(@PathVariable int comicId, @PathVariable int userId){
        return serviceUserCollection.hasTheComic(comicId,userId);
    }

    @DeleteMapping("/delete/{comicId}/{userId}")
    public void deleteComicFromCollection(@PathVariable int comicId, @PathVariable int userId){
        serviceUserCollection.removeComicFromUserCollection(comicId,userId);
    }
}
