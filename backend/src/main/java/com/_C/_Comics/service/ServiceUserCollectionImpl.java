package com._C._Comics.service;

import com._C._Comics.models.Comic;
import com._C._Comics.models.User;
import com._C._Comics.models.UserCollection;
import com._C._Comics.repository.ComicRepository;
import com._C._Comics.repository.UserCollectionRepository;
import com._C._Comics.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

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
    public boolean existsByUserAndComic(User user, Comic comic) {
        return userCollectionRepository.existsByUserAndComic(user, comic);
    }

    @Override
    public void addComicToUserCollection(int comicId, String nick) {

        User user = userRepository.findByNick(nick);
        Comic comic = comicRepository.findById(comicId).orElseThrow(() -> new RuntimeException("Cómic no encontrado"));

        if (!userCollectionRepository.existsByUserAndComic(user, comic)) {
            UserCollection userCollection = new UserCollection();
            userCollection.setUser(user);
            userCollection.setComic(comic);
            userCollection.setAddedIn(Instant.now());
            userCollection.setState("Read");
            userCollectionRepository.save(userCollection);
        }
    }


}
