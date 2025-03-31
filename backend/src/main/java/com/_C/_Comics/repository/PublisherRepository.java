package com._C._Comics.repository;

import com._C._Comics.dto.PublisherDTO;
import com._C._Comics.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublisherRepository extends JpaRepository<Publisher, Integer> {

    List<Publisher> findByNameContainingIgnoreCase(String name);

    List<Publisher> findByPostalCode(Integer postalCode);

    List<Publisher> findByTownContainingIgnoreCase(String town);

    List<Publisher> findByProvinceContainingIgnoreCase(String province);
}
