package com._C._Comics.service;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.models.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServiceAuthor {
    public Page<AuthorDTO> getAllAuthors(Pageable pageable);
    public AuthorDTO getAuthorById(int id);
    public List<AuthorDTO> getAuthorsByName(String name,String lastName);
    public List<AuthorDTO> getAuthorsByNationality(String nationality);
    public List<AuthorDTO> getAuthorsBetweenBirthDates(String startDate, String endDate);
    public List<AuthorDTO> getAuthorsWhoAreScripters();
    public List<AuthorDTO> getAuthorsWhoAreDrawers();
    public void saveAuthor(Author author);
    public Author updateAuthor(Author author, int id);
    public void deleteAuthor(int id);
}
