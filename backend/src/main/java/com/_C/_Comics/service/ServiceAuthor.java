package com._C._Comics.service;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.entity.Author;

import java.util.List;

public interface ServiceAuthor {
    public List<AuthorDTO> getAllAuthors();
    public AuthorDTO getAuthorById(int id);
    public List<AuthorDTO> getAuthorsByName(String name,String lastName);
    public List<AuthorDTO> getAuthorsByNationality(String nationality);
    public List<AuthorDTO> getAuthorsWhoAreScripters();
    public List<AuthorDTO> getAuthorsWhoAreDrawers();
}
