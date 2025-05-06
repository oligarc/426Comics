package com._C._Comics.repository;

import com._C._Comics.models.Lista;
import com._C._Comics.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListaRepository extends JpaRepository<Lista, Integer> {
    List<Lista> findByUser(User user);
}
