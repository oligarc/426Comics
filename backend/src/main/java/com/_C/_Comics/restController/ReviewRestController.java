package com._C._Comics.restController;

import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.models.Review;
import com._C._Comics.models.User;
import com._C._Comics.repository.ReviewRepository;
import com._C._Comics.repository.UserRepository;
import com._C._Comics.service.ServiceReview;
import com._C._Comics.service.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewRestController {

    private ServiceReview serviceReview;
    private UserRepository userRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewRestController(ServiceReview v_serviceReview, UserRepository v_userRepository,ReviewRepository v_reviewRepository){
        this.serviceReview=v_serviceReview;
        this.userRepository=v_userRepository;
        this.reviewRepository=v_reviewRepository;
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
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepository.findByNick(username);
        review.setUser(user);
        serviceReview.saveReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // 201 Created
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateReview(@RequestBody Review review, @PathVariable int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String nick = auth.getName();
        User user = userRepository.findByNick(nick);

        Review review1 = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No review with that id"));

        if (review1.getUser() == null || !review1.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permiso para actualizar esta reseña");
        }

        review1.setRating(review.getRating());
        review1.setReviewText(review.getReviewText());
        reviewRepository.save(review1);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReviewById(@PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String nick = authentication.getName();
        User user = userRepository.findByNick(nick);
        Review review = reviewRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "No review with that id"));
        if(!review.getUser().getId().equals(user.getId())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permiso para eliminar esta reseña");
        }
        serviceReview.deleteReview(id);
        return ResponseEntity.noContent().build();
    }


}
