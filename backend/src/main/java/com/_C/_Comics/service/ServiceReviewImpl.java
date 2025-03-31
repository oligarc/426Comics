package com._C._Comics.service;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.dto.UserDTO;
import com._C._Comics.entity.Comic;
import com._C._Comics.entity.Review;
import com._C._Comics.entity.User;
import com._C._Comics.repository.ReviewRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceReviewImpl implements ServiceReview{

    private ReviewRepository reviewRepository;
    private ServiceUser serviceUser;
    private ServiceComic serviceComic;

    public ServiceReviewImpl(ReviewRepository v_reviewRepository,ServiceUser v_serviceUser,ServiceComic v_serviceComic){
        this.reviewRepository=v_reviewRepository;
        this.serviceUser=v_serviceUser;
        this.serviceComic=v_serviceComic;
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

    private ReviewDTO convertToReviewDTO(Review review){
        int userId = review.getUser().getId();
        UserDTO userDTO = serviceUser.getUserById(userId);
        return new ReviewDTO(review.getId(),review.getRating(),userDTO,review.getReviewText(),review.getReviewedAt(),review.getLastUpdatedAt());
    }
}
