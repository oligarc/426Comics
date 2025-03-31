package com._C._Comics.service;

import com._C._Comics.dto.ReviewDTO;

import java.util.List;

public interface ServiceReview {
    public List<ReviewDTO> getReviewsByComicId(int comicId);
    public List<ReviewDTO> getReviewsByComicName(String name);
}
