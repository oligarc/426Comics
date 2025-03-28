package com._C._Comics.restController;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.dto.ComicDTO;
import com._C._Comics.entity.Comic;
import com._C._Comics.service.ServiceAuthor;
import com._C._Comics.service.ServiceComic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private ServiceComic serviceComic;
    private ServiceAuthor serviceAuthor;

    @Autowired
    public RestController(ServiceComic v_serviceComic, ServiceAuthor v_serviceAuthor){
        this.serviceComic=v_serviceComic;
        this.serviceAuthor=v_serviceAuthor;
    }

    @GetMapping("/comics")
    public List<ComicDTO> allComics(){
        return serviceComic.getAllComics();
    }

    @GetMapping("/comics/{id}")
    public ComicDTO getComicsById(@PathVariable int id){
        return serviceComic.getComicByID(id);
    }

    @GetMapping("/comics/title/{title}")
    public List<ComicDTO> getComicsByTitle(@PathVariable String title){
        return serviceComic.getComicsByName(title);
    }

    @GetMapping("/comics/author/{authorName}")
    public List<ComicDTO> getComicsByAuthorName(@PathVariable String authorName){
        // Had to divide the name, name and LastName
        String[] authorParts = authorName.split(" ");
        String firstName = authorParts[0]; // First value as name
        String lastName = authorParts.length > 1 ? authorParts[1] : ""; //Second value as lastName, if exists of course

        return serviceComic.getComicsByAuthorName(firstName,lastName);
    }

    @GetMapping("/comics/publisher/{publisherName}")
    public List<ComicDTO> getComicsByPublisherName(@PathVariable String publisherName){
        return serviceComic.getComicsByPublisherName(publisherName);
    }

    @GetMapping("/comics/isbn/{isbn}")
    public ComicDTO getComicByISBN(@PathVariable String isbn){
        return serviceComic.getComicByISBN(isbn);
    }

    @GetMapping("/comics/price-range")
    public List<ComicDTO> getComicsByPriceRange(@RequestParam BigDecimal min, @RequestParam BigDecimal max){
        return serviceComic.getComicsByPriceRange(min,max);
    }

    @GetMapping("/comics/page-range")
    public List<ComicDTO> getComicsByPageRange(@RequestParam int min,@RequestParam int max){
        return serviceComic.getComicsByPageCountRange(min,max);
    }

    @GetMapping("/comics/stock-range")
    public List<ComicDTO> getComicsByStockRange(@RequestParam int min,@RequestParam int max){
        return serviceComic.getComicsByStockRange(min, max);
    }

    @PostMapping("/comics/")
    public Comic saveComic(@RequestBody Comic comic){
        serviceComic.saveComic(comic);
        return comic;
    }

    @GetMapping("/author/{id}")
    public AuthorDTO getAuthorById(@PathVariable int id){
        return serviceAuthor.getAuthorById(id);
    }
}
