package com._C._Comics.repository;

import com._C._Comics.models.Comic;
import com._C._Comics.models.User;
import com._C._Comics.models.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCollectionRepository extends JpaRepository<UserCollection,Integer> {
    boolean existsByUserAndComic(User user, Comic comic);

    Optional<UserCollection> findByUserAndComic(User user, Comic comic);
}
