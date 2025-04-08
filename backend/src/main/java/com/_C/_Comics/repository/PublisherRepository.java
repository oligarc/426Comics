package com._C._Comics.repository;

import com._C._Comics.models.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {

    List<Publisher> findByNameContainingIgnoreCase(String name);

    List<Publisher> findByPostalCode(Integer postalCode);

    List<Publisher> findByTownContainingIgnoreCase(String town);

    List<Publisher> findByProvinceContainingIgnoreCase(String province);

    Optional<Publisher> findById(int id);

}
