package com._C._Comics.service;

import com._C._Comics.dto.*;
import com._C._Comics.entity.Author;
import com._C._Comics.repository.AuthorRepository;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.entity.Comic;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceComicImpl implements ServiceComic {

    private ComicRepository comicRepository;
    private AuthorRepository authorRepository;

    public ServiceComicImpl(ComicRepository v_comicRepository) {
        this.comicRepository = v_comicRepository;
    }

    @Override
    public List<ComicDTO> getAllComics() {
        List<Comic> comics = comicRepository.findAll();
        return comics.stream().map(this::convertToComicDTO).collect(Collectors.toList());
    }

    @Override
    public ComicDTO getComicByID(int id) {
        Comic comic = comicRepository.findById(id).orElse(null);
        return comic != null ? convertToComicDTO(comic) : null;
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
        if (comic.getAuthor() == null) {
            throw new RuntimeException("Comic must have an author");
        }
        Author author = comic.getAuthor();
        Author existingAuthor = authorRepository.findById(author.getId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        comic.setAuthor(existingAuthor);
        comicRepository.save(comic);
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
                comic.getPublisher().getTelephone()
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

