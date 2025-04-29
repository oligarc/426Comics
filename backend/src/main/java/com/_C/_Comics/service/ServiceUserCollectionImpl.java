package com._C._Comics.service;

import com._C._Comics.dto.*;
import com._C._Comics.models.Comic;
import com._C._Comics.models.User;
import com._C._Comics.models.UserCollection;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.repository.UserCollectionRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceUserCollectionImpl implements ServiceUserCollection {

    private UserRepository userRepository;
    private ComicRepository comicRepository;
    private UserCollectionRepository userCollectionRepository;

    public ServiceUserCollectionImpl(UserRepository userRepository,
                                     ComicRepository comicRepository,
                                     UserCollectionRepository userCollectionRepository){
        this.userRepository=userRepository;
        this.comicRepository=comicRepository;
        this.userCollectionRepository=userCollectionRepository;
    }

    @Override
    public Page<ComicDTO> getComicsByUserId(Pageable pageable, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->new RuntimeException("Usuario no encontrado"));
        Page<UserCollection> userCollections = userCollectionRepository.findAllByUser_Id(userId,pageable);
        return userCollections.map(userCollection -> convertToComicDTO(userCollection.getComic()));
    }

    @Override
    public boolean existsByUserAndComic(User user, Comic comic) {
        return userCollectionRepository.existsByUserAndComic(user, comic);
    }

    @Override
    public boolean hasTheComic(int comicId, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return user.getUserCollections().stream().anyMatch(uc -> uc.getComic().getId() == comicId);
    }

    @Override
    public void addComicToUserCollection(int comicId, int userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Comic comic = comicRepository.findById(comicId).orElseThrow(() -> new RuntimeException("Cómic no encontrado"));

        if (!userCollectionRepository.existsByUserAndComic(user, comic)) {
            UserCollection userCollection = new UserCollection();
            userCollection.setUser(user);
            userCollection.setComic(comic);
            userCollection.setAddedIn(Instant.now());
            userCollection.setState("To be read");
            userCollectionRepository.save(userCollection);
        }
    }

    @Override
    public void removeComicFromUserCollection(int comicId, int userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Comic comic = comicRepository.findById(comicId).orElseThrow(()-> new RuntimeException("Cómic no encontrado"));
        UserCollection userCollection = userCollectionRepository.findByUserAndComic(user,comic).orElseThrow(() -> new RuntimeException("La relación no existe"));
        userCollectionRepository.delete(userCollection);
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
