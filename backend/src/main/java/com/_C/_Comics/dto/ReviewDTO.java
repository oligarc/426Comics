package com._C._Comics.dto;

import java.time.Instant;

public class ReviewDTO {
    private Integer id;
    private Integer rating;
    private String reviewText;
    private UserDTO userDTO;
    private Instant reviewedAt;
    private Instant lastUpdatedAt;

    public ReviewDTO(){

    }
    public ReviewDTO(Integer id, Integer rating, UserDTO userDTO, String reviewText, Instant reviewedAt, Instant lastUpdatedAt) {
        this.id = id;
        this.rating = rating;
        this.userDTO = userDTO;
        this.reviewText = reviewText;
        this.reviewedAt = reviewedAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Instant getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(Instant reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public Instant getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(Instant lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }
}
