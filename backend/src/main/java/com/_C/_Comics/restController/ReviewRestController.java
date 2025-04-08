package com._C._Comics.restController;

import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.models.Review;
import com._C._Comics.service.ServiceReview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<ReviewDTO>> getReviewsByComicId(@PathVariable int comicId) {
        List<ReviewDTO> reviews = serviceReview.getReviewsByComicId(comicId);
        if (reviews.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .header("X-Message", "No reviews found for this comic")
                    .build();
        }
        return ResponseEntity.ok()
                .header("X-Message", "Reviews fetched successfully")
                .body(reviews);
    }

    @GetMapping("/name/{comicName}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByComicName(@PathVariable String comicName){
        List<ReviewDTO> reviews = serviceReview.getReviewsByComicName(comicName);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(reviews); // 200 OK
    }

    @PostMapping("/")
    public ResponseEntity<Void> addReview(@RequestBody Review review){
        serviceReview.saveReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateReview(@RequestBody Review review, @PathVariable int id) {
        try {
            serviceReview.updateReview(review, id);
            return ResponseEntity.ok().build(); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }


}
