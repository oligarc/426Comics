package com._C._Comics.repository;

import com._C._Comics.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByNombre(String nombre);
}
