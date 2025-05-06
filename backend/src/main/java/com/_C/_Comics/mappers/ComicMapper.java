package com._C._Comics.mappers;

import com._C._Comics.dto.*;
import com._C._Comics.models.Comic;

import java.util.List;
import java.util.stream.Collectors;

public class ComicMapper {

    public static ComicDTO converToComicDTO(Comic comic){
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
