package com._C._Comics.service;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.models.Comic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ServiceComic {
    public Page<ComicDTO> getAllComics(Pageable pageable);
    public ComicDTO getComicByID(int id);
    public List<ComicDTO> getComicsByName(String title);
    public Page<ComicDTO> getComicsByAuthorName(Pageable pageable,String authorName,String authorLastName);
    public List<ComicDTO> getComicsByPublisherName(String publisher);
    public Page<ComicDTO> getComicsByPublisherId(Pageable pageable, int publisherId);
    public ComicDTO getComicByISBN(String ISBN);
    public List<ComicDTO> getComicsByPriceRange(BigDecimal minimum,BigDecimal max);
    public List<ComicDTO> getComicsByPageCountRange(int minimum, int max);
    public List<ComicDTO> getComicsByStockRange(int minimum,int max);
    public void saveComic(Comic comic);
    public void updateComic(Comic comic,int comicId);
    public void deleteComic(int comicId);

}
