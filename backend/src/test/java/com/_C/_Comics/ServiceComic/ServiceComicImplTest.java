package com._C._Comics.ServiceComic;

import com._C._Comics.dto.ComicDTO;
import com._C._Comics.service.ServiceComicImpl;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ServiceComicImplTest {

    @Autowired
    private ServiceComicImpl serviceComic;

    @Test
    @Transactional
    public void testGetAllComics() {
        List<ComicDTO> comics = serviceComic.getAllComics();

        for (ComicDTO comic : comics) {
            System.out.println(comic.toString());
        }
    }
}

