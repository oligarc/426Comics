package com._C._Comics.service;

import com._C._Comics.dto.ReviewDTO;
import com._C._Comics.models.Review;

import java.util.List;

public interface ServiceReview {
    public List<ReviewDTO> getReviewsByComicId(int comicId);
    public List<ReviewDTO> getReviewsByComicName(String name);
    public void saveReview(Review review);
    public void updateReview(Review review,int reviewId);
}
