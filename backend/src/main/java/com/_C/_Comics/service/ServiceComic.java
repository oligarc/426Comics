package com._C._Comics.service;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.entity.Comic;

import java.math.BigDecimal;
import java.util.List;

public interface ServiceComic {
    public List<ComicDTO> getAllComics();
    public ComicDTO getComicByID(int id);
    public List<ComicDTO> getComicsByName(String title);
    public List<ComicDTO> getComicsByAuthorName(String authorName,String authorLastName);
    public List<ComicDTO> getComicsByPublisherName(String publisher);
    public ComicDTO getComicByISBN(String ISBN);
    public List<ComicDTO> getComicsByPriceRange(BigDecimal minimum,BigDecimal max);
    public List<ComicDTO> getComicsByPageCountRange(int minimum, int max);
    public List<ComicDTO> getComicsByStockRange(int minimum,int max);
    public void saveComic(Comic comic);

}
