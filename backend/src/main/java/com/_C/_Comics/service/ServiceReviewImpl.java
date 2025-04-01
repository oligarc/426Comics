package com._C._Comics.service;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.dto.UserDTO;
import com._C._Comics.entity.Author;
import com._C._Comics.entity.Comic;
import com._C._Comics.entity.Review;
import com._C._Comics.entity.User;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.repository.ReviewRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceReviewImpl implements ServiceReview{

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private ComicRepository comicRepository;
    private ServiceUser serviceUser;

    public ServiceReviewImpl(ReviewRepository v_reviewRepository,UserRepository v_userRepository,ComicRepository v_comicRepository,ServiceUser v_serviceUser){
        this.reviewRepository=v_reviewRepository;
        this.userRepository=v_userRepository;
        this.comicRepository=v_comicRepository;
        this.serviceUser=v_serviceUser;
    }

    @Override
    public List<ReviewDTO> getReviewsByComicId(int id) {
        List<Review> reviews = reviewRepository.findByComicId(id);
        return reviews.stream().map(this::convertToReviewDTO).collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getReviewsByComicName(String name) {
        List<Review> reviews = reviewRepository.findByComicTitleContainingIgnoreCase(name);
        return reviews.stream().map(this::convertToReviewDTO).collect(Collectors.toList());
    }

    @Override
    public void saveReview(Review review) {
        Comic existingComic = comicRepository.findById(review.getComic().getId()).orElseThrow(() ->new RuntimeException("No comic with that id"));
        User existingUser = userRepository.findById(review.getUser().getId()).orElseThrow(()-> new RuntimeException("No user with that id"));
        reviewRepository.save(review);

    }

    @Override
    public void updateReview(Review review, int reviewId) {
        Review existingReview = reviewRepository.findById(reviewId).orElseThrow((() -> new RuntimeException("No review with that id")));
        if (review.getRating() != null) {
            existingReview.setRating(review.getRating());
        }
        if (review.getReviewText() != null && !review.getReviewText().isBlank()) {
            existingReview.setReviewText(review.getReviewText());
        }
         reviewRepository.save(existingReview);
    }

    private ReviewDTO convertToReviewDTO(Review review){
        int userId = review.getUser().getId();
        UserDTO userDTO =  serviceUser.getUserById(userId);
        return new ReviewDTO(review.getId(),review.getRating(),userDTO,review.getReviewText(),review.getReviewedAt(),review.getLastUpdatedAt());
    }
}
