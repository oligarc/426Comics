package com._C._Comics.repository;

import com._C._Comics.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Integer> {
    List<Review> findByComicId(int comicId);
    List<Review> findByComicTitleContainingIgnoreCase(String comicTitle);
}
