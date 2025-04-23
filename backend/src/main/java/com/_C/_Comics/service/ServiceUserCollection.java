package com._C._Comics.service;

import com._C._Comics.models.Comic;
import com._C._Comics.models.User;

public interface ServiceUserCollection {
    boolean existsByUserAndComic(User user, Comic comic);
    boolean hasTheComic(int comicId,int userId);
    void addComicToUserCollection(int comicId,int userId);
    void removeComicFromUserCollection(int comicId,int userId);
}
