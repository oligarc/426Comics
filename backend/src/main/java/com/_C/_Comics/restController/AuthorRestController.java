package com._C._Comics.restController;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.entity.Author;
import com._C._Comics.service.ServiceAuthor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorRestController {
    private ServiceAuthor serviceAuthor;

    @Autowired
    public AuthorRestController(ServiceAuthor v_serviceAuthor){
        this.serviceAuthor=v_serviceAuthor;
    }

    @GetMapping("/")
    public List<AuthorDTO> allAuthors(){
        return serviceAuthor.getAllAuthors();
    }

    @GetMapping("/id/{id}")
    public AuthorDTO getAuthorById(@PathVariable int id){
        return serviceAuthor.getAuthorById(id);
    }

    @GetMapping("/name/{authorName}")
    public List<AuthorDTO> getAuthorsByAuthorName(@PathVariable String authorName){
        String [] authorParts = authorName.split(" ");
        String authorNameT = authorParts[0];
        String authorLastName = authorParts.length > 1 ? authorParts[1] : "";
        return serviceAuthor.getAuthorsByName(authorNameT,authorLastName);
    }

    @GetMapping("/nationality/{nationality}")
    public List<AuthorDTO> getAuthorsByNationality(@PathVariable String nationality){
        return serviceAuthor.getAuthorsByNationality(nationality);
    }

    @GetMapping("/birthdate/{startDate}/{endDate}")
    public List<AuthorDTO> getAuthorsBetweenBirthDates(@PathVariable String startDate, @PathVariable String endDate){
        return serviceAuthor.getAuthorsBetweenBirthDates(startDate,endDate);
    }

    @GetMapping("/scripters")
    public List<AuthorDTO> getAuthorsWhoAreScripters(){
        return serviceAuthor.getAuthorsWhoAreScripters();
    }

    @GetMapping("/drawers")
    public List<AuthorDTO> getAuthorsWhoAreDrawers(){
        return serviceAuthor.getAuthorsWhoAreDrawers();
    }

    @PostMapping("/")
    public void saveAuthor(@RequestBody Author author){
        serviceAuthor.saveAuthor(author);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(@RequestBody Author author,@PathVariable int id){
        return serviceAuthor.updateAuthor(author,id);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable int id){
        serviceAuthor.deleteAuthor(id);
    }
}
