package com._C._Comics.repository;

import com._C._Comics.entity.Comic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComicRepository extends JpaRepository<Comic,Integer> {
}
