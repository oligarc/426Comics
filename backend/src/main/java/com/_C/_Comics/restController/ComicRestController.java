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
@RequestMapping("/api/comics")
public class ComicRestController {

    private ServiceComic serviceComic;

    @Autowired
    public ComicRestController(ServiceComic v_serviceComic){
        this.serviceComic=v_serviceComic;
    }

    @GetMapping("/")
    public List<ComicDTO> allComics(){
        return serviceComic.getAllComics();
    }

    @GetMapping("/{id}")
    public ComicDTO getComicsById(@PathVariable int id){
        return serviceComic.getComicByID(id);
    }

    @GetMapping("/title/{title}")
    public List<ComicDTO> getComicsByTitle(@PathVariable String title){
        return serviceComic.getComicsByName(title);
    }

    @GetMapping("/author/{authorName}") //Need to check it because it's not working properly
    public List<ComicDTO> getComicsByAuthorName(@PathVariable String authorName) {
        String[] parts = authorName.split(" ", 2);
        String name = parts[0];
        String lastname = (parts.length > 1) ? parts[1] : "";
        return serviceComic.getComicsByAuthorName(name, lastname);
    }


    @GetMapping("/publisher/{publisherName}")
    public List<ComicDTO> getComicsByPublisherName(@PathVariable String publisherName){
        return serviceComic.getComicsByPublisherName(publisherName);
    }

    @GetMapping("/isbn/{isbn}")
    public ComicDTO getComicByISBN(@PathVariable String isbn){
        return serviceComic.getComicByISBN(isbn);
    }

    @GetMapping("/price-range")
    public List<ComicDTO> getComicsByPriceRange(@RequestParam BigDecimal min, @RequestParam BigDecimal max){
        return serviceComic.getComicsByPriceRange(min,max);
    }

    @GetMapping("/page-range")
    public List<ComicDTO> getComicsByPageRange(@RequestParam int min,@RequestParam int max){
        return serviceComic.getComicsByPageCountRange(min,max);
    }

    @GetMapping("/stock-range")
    public List<ComicDTO> getComicsByStockRange(@RequestParam int min,@RequestParam int max){
        return serviceComic.getComicsByStockRange(min, max);
    }

    @PostMapping("/")
    public void saveComic(@RequestBody Comic comic){
        serviceComic.saveComic(comic);
    }

    @PutMapping("/{id}")
    public void updateComicByComicId(@RequestBody Comic comic,@PathVariable int id){
        serviceComic.updateComic(comic, id);
    }

    @DeleteMapping("/{id}")
    public void deleteComicById(@PathVariable int id){
        serviceComic.deleteComic(id);
    }
}
