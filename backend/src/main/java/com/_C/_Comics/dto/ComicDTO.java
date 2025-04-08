package com._C._Comics.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class ComicDTO {

    private Integer id;
    private String title;
    private LocalDate launchDate;
    private BigDecimal price;
    private Integer stock;
    private String isbn;
    private String coverUrl;
    private String description;
    private Integer pageCount;
    private Boolean isCollection;
    private Integer collectionVolume;
    private AuthorDTO authorDTO;
    private PublisherDTO publisherDTO;
    private List<ReviewDTO> reviewDTO;

    public ComicDTO(){

    }

    public ComicDTO(Integer id, String title, LocalDate launchDate, BigDecimal price, Integer stock, String isbn, String coverUrl, String description, Integer pageCount, Boolean isCollection, Integer collectionVolume, AuthorDTO authorDTO, PublisherDTO publisherDTO, List<ReviewDTO> reviewDTO) {
        this.id = id;
        this.title = title;
        this.launchDate = launchDate;
        this.price = price;
        this.stock = stock;
        this.isbn = isbn;
        this.coverUrl = coverUrl;
        this.description = description;
        this.pageCount = pageCount;
        this.isCollection = isCollection;
        this.collectionVolume = collectionVolume;
        this.authorDTO = authorDTO;
        this.publisherDTO = publisherDTO;
        this.reviewDTO = reviewDTO;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getLaunchDate() {
        return launchDate;
    }

    public void setLaunchDate(LocalDate launchDate) {
        this.launchDate = launchDate;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public Boolean getCollection() {
        return isCollection;
    }

    public void setCollection(Boolean collection) {
        isCollection = collection;
    }

    public Integer getCollectionVolume() {
        return collectionVolume;
    }

    public void setCollectionVolume(Integer collectionVolume) {
        this.collectionVolume = collectionVolume;
    }

    public AuthorDTO getAuthorDTO() {
        return authorDTO;
    }

    public void setAuthorDTO(AuthorDTO authorDTO) {
        this.authorDTO = authorDTO;
    }

    public PublisherDTO getPublisherDTO() {
        return publisherDTO;
    }

    public void setPublisherDTO(PublisherDTO publisherDTO) {
        this.publisherDTO = publisherDTO;
    }

    public List<ReviewDTO> getReviewDTO() {
        return reviewDTO;
    }

    public void setReviewDTO(List<ReviewDTO> reviewDTO) {
        this.reviewDTO = reviewDTO;
    }
}
