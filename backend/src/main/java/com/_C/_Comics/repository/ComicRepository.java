package com._C._Comics.repository;

import com._C._Comics.models.Comic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ComicRepository extends JpaRepository<Comic,Integer> {
    //Just for me to know, in this case if I don't want to have SB generates this automatically I can use this
    //@Query("SELECT c from Comic c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    //List<Comic> searchByTitle(@Param("title") String title);
    List<Comic> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT c FROM Comic c WHERE " +
            "(LOWER(c.author.name) LIKE LOWER(CONCAT('%', :name, '%')) OR :name IS NULL) " +
            "AND (LOWER(c.author.lastName) LIKE LOWER(CONCAT('%', :lastname, '%')) OR :lastname IS NULL)")
    List<Comic> findByAuthorNameOrLastName(@Param("name") String name, @Param("lastname") String lastname);

    @Query("SELECT c FROM Comic c where LOWER(c.publisher.name) LIKE LOWER(CONCAT('%', :publisherName , '%')) ")
    List<Comic> findByPublisherName(@Param("publisherName") String publisherName);

    Comic findByIsbn(String isbn);
    List<Comic> findByPriceBetween(BigDecimal min, BigDecimal max);

    List<Comic> findByPageCountBetween(Integer minPages, Integer maxPages);

    List<Comic> findByStockBetween(Integer minStock, Integer maxStock);
    List<Comic> findByPublisherId(int publisherId);
}
