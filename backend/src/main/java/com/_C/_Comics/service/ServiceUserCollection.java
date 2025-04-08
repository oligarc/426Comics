package com._C._Comics.service;

import com._C._Comics.models.Comic;
import com._C._Comics.models.User;

public interface ServiceUserCollection {
    boolean existsByUserAndComic(User user, Comic comic);
    void addComicToUserCollection(int comicId,String nick);
}
