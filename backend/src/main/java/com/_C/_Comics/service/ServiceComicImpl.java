package com._C._Comics.service;

import com._C._Comics.dto.*;
import com._C._Comics.models.Author;
import com._C._Comics.models.Publisher;
import com._C._Comics.repository.AuthorRepository;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.models.Comic;
import com._C._Comics.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceComicImpl implements ServiceComic {

    private ComicRepository comicRepository;
    private AuthorRepository authorRepository;
    private PublisherRepository publisherRepository;

    @Autowired
    public ServiceComicImpl(ComicRepository v_comicRepository,AuthorRepository v_authorRepository,PublisherRepository v_publisherRepository) {
        this.comicRepository = v_comicRepository;
        this.authorRepository=v_authorRepository;
        this.publisherRepository=v_publisherRepository;
    }

    @Override
    public List<ComicDTO> getAllComics() {
        List<Comic> comics = comicRepository.findAll();
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public ComicDTO getComicByID(int id) {
        Comic comic = comicRepository.findById(id).orElseThrow(() -> new RuntimeException("There's no comic with that id"));
        return convertToComicDTO(comic);
    }

    @Override
    public List<ComicDTO> getComicsByName(String title) {
        List<Comic> comicsByName = comicRepository.findByTitleContainingIgnoreCase(title); //Thought I would have to use a select * where lower(title) like(%xXx%) but SB is GOAT
        return comicsByName.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public List<ComicDTO> getComicsByAuthorName(String authorName,String authorLastName) {
        if(authorLastName.isEmpty()){
            List<Comic> comics = comicRepository.findByAuthorNameOrLastName(authorName,null);
            return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
        }else{
            List<Comic> comics = comicRepository.findByAuthorNameOrLastName(authorName,authorLastName);
            return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
        }
    }

    @Override
    public List<ComicDTO> getComicsByPublisherName(String publisher) {
        List<Comic> comics = comicRepository.findByPublisherName(publisher);
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public List<ComicDTO> getComicsByPublisherId(int publisherId) {
        List<Comic> comics = comicRepository.findByPublisherId(publisherId);
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public ComicDTO getComicByISBN(String ISBN) {
        Comic comic = comicRepository.findByIsbn(ISBN);
        return convertToComicDTO(comic);
    }

    @Override
    public List<ComicDTO> getComicsByPriceRange(BigDecimal minimum, BigDecimal max) {
        List<Comic> comics = comicRepository.findByPriceBetween(minimum,max);
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public List<ComicDTO> getComicsByPageCountRange(int minimum, int max) {
        List<Comic> comics = comicRepository.findByPageCountBetween(minimum,max);
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public List<ComicDTO> getComicsByStockRange(int minimum, int max) {
        List<Comic> comics = comicRepository.findByStockBetween(minimum,max);
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public void saveComic(Comic comic) {
        Author existingAuthor = authorRepository.findById(comic.getAuthor().getId()).orElseThrow(()-> new RuntimeException("No author with that id"));
        Publisher existingPublisher = publisherRepository.findById(comic.getPublisher().getId()).orElseThrow(()-> new RuntimeException("No publisher with that id"));
         comicRepository.save(comic);
    }

    @Override
    public void updateComic(Comic comic, int comicId) {
        Comic existingComic = comicRepository.findById(comicId).orElseThrow(()-> new RuntimeException("No comic with that id"));
        existingComic.setTitle(comic.getTitle());
        existingComic.setLaunchDate(comic.getLaunchDate());
        existingComic.setPrice(comic.getPrice());
        existingComic.setStock(comic.getStock());
        existingComic.setIsbn(comic.getIsbn());
        existingComic.setCoverUrl(comic.getCoverUrl());
        existingComic.setDescription(comic.getDescription());
        existingComic.setPageCount(comic.getPageCount());
        existingComic.setIsCollection(comic.getIsCollection());
        existingComic.setCollectionVolume(comic.getCollectionVolume());
        existingComic.setAuthor(comic.getAuthor());
        existingComic.setPublisher(comic.getPublisher());
        comicRepository.save(existingComic);
    }

    @Override
    public void deleteComic(int comicId) {
        Comic existingComic = comicRepository.findById(comicId).orElseThrow(()-> new RuntimeException("No comic with that id"));
        comicRepository.deleteById(comicId);
    }

    private ComicDTO convertToComicDTO(Comic comic){

        AuthorDTO authorDTO = new AuthorDTO(
                comic.getAuthor().getId(),
                comic.getAuthor().getName(),
                comic.getAuthor().getLastName(),
                comic.getAuthor().getNationality(),
                comic.getAuthor().getBiography(),
                comic.getAuthor().getBirthDate(),
                comic.getAuthor().getDeathDate(),
                comic.getAuthor().getPhotoUrl(),
                comic.getAuthor().getIsScriptwriter(),
                comic.getAuthor().getIsDrawer());

        PublisherDTO publisherDTO = new PublisherDTO(
                comic.getPublisher().getId(),
                comic.getPublisher().getName(),
                comic.getPublisher().getWebsiteUrl(),
                comic.getPublisher().getBusinessPlace(),
                comic.getPublisher().getPostalCode(),
                comic.getPublisher().getTown(),
                comic.getPublisher().getProvince(),
                comic.getPublisher().getTelephone(),
                comic.getPublisher().getLogoUrl()
        );

        List<ReviewDTO> reviews = comic.getReviews().stream().map(review -> {
            UserDTO userDTO = new UserDTO(
                    review.getUser().getId(),
                    review.getUser().getNick()
            );
            return new ReviewDTO(
                    review.getId(),
                    review.getRating(),
                    userDTO,
                    review.getReviewText(),
                    review.getReviewedAt(),
                    review.getLastUpdatedAt()
            );
        }).collect(Collectors.toList());

        return new ComicDTO(
                comic.getId(),
                comic.getTitle(),
                comic.getLaunchDate(),
                comic.getPrice(),
                comic.getStock(),
                comic.getIsbn(),
                comic.getCoverUrl(),
                comic.getDescription(),
                comic.getPageCount(),
                comic.getIsCollection(),
                comic.getCollectionVolume(),
                authorDTO,
                publisherDTO,
                reviews);

    }
}

