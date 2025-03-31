package com._C._Comics.restController;

import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.repository.ReviewRepository;
import com._C._Comics.service.ServiceReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewRestController {

    private ServiceReview serviceReview;

    @Autowired
    public ReviewRestController(ServiceReview v_serviceReview){
        this.serviceReview=v_serviceReview;
    }

    @GetMapping("/id/{comicId}")
    public List<ReviewDTO> getReviewsByComicId(@PathVariable int comicId){
        return  serviceReview.getReviewsByComicId(comicId);
    }

    @GetMapping("/name/{comicName}")
    public List<ReviewDTO> getReviewsByComicName(@PathVariable String comicName){
        return serviceReview.getReviewsByComicName(comicName);
    }
}
