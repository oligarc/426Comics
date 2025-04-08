package com._C._Comics.repository;

import com._C._Comics.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByNick(String nick);
}
