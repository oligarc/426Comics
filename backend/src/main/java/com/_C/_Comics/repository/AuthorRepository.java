package com._C._Comics.repository;

import com._C._Comics.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Integer> {
    @Query("SELECT a FROM Author a WHERE LOWER(a.name) = LOWER(:name) OR LOWER(a.lastName) = LOWER(:lastname)")
    List<Author> findByNameContainingIgnoreCase(@Param("name") String name, @Param("lastname") String lastname);
    List<Author> findByNationalityContainingIgnoreCase(String nationality);
    List<Author> findByIsScriptwriter(boolean isScriptwriter);
    List<Author> findByIsDrawer(Boolean isDrawer);
    List<Author> findByBirthDateBetween(LocalDate birthDateAfter, LocalDate birthDateBefore);
}
