package com._C._Comics.service;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.models.Comic;
import com._C._Comics.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ServiceUserCollection {
    Page<ComicDTO> getComicsByUserId(Pageable pageable, int userId);
    boolean existsByUserAndComic(User user, Comic comic);
    boolean hasTheComic(int comicId,int userId);
    void addComicToUserCollection(int comicId,int userId);
    void removeComicFromUserCollection(int comicId,int userId);
}
