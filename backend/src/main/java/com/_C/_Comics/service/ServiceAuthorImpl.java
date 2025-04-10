package com._C._Comics.service;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.models.Author;
import com._C._Comics.repository.AuthorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ServiceAuthorImpl implements ServiceAuthor {

    private AuthorRepository authorRepository;

    public ServiceAuthorImpl(AuthorRepository v_authorRepository){
        this.authorRepository=v_authorRepository;
    }

    /*
    @Override
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream().map(this::converToAuthorDTO).toList();
    }
    */

    @Override
    public Page<AuthorDTO> getAllAuthors(Pageable pageable) {
        Page<Author> authorPage = authorRepository.findAll(pageable);
        return authorPage.map(this::converToAuthorDTO);
    }

    @Override
    public AuthorDTO getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElseThrow(() -> new RuntimeException("Author not found"));
        return converToAuthorDTO(author);
    }

    @Override
    public List<AuthorDTO> getAuthorsByName(String name, String lastName) {
        List<Author> authors = authorRepository.findByNameContainingIgnoreCase(name,lastName);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public List<AuthorDTO> getAuthorsByNationality(String nationality) {
        List<Author> authors = authorRepository.findByNationalityContainingIgnoreCase(nationality);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public List<AuthorDTO> getAuthorsBetweenBirthDates(String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthDateBefore = LocalDate.parse(startDate,formatter);
        LocalDate birthDateAfter = LocalDate.parse(endDate,formatter);
        List<Author> authors = authorRepository.findByBirthDateBetween(birthDateBefore,birthDateAfter);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public List<AuthorDTO> getAuthorsWhoAreScripters() {
        List<Author> authors = authorRepository.findByIsScriptwriter(true);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public List<AuthorDTO> getAuthorsWhoAreDrawers() {
        List<Author> authors = authorRepository.findByIsDrawer(true);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public void saveAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public Author updateAuthor(Author author, int id) {
        Author existingAuthor = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No author with that id"));

        existingAuthor.setName(author.getName());
        existingAuthor.setLastName(author.getLastName());
        existingAuthor.setNationality(author.getNationality());
        existingAuthor.setBirthDate(author.getBirthDate());
        existingAuthor.setDeathDate(author.getDeathDate());
        existingAuthor.setBiography(author.getBiography());
        existingAuthor.setPhotoUrl(author.getPhotoUrl());
        existingAuthor.setIsScriptwriter(author.getIsScriptwriter());
        existingAuthor.setIsDrawer(author.getIsDrawer());

        return authorRepository.save(existingAuthor);
    }

    @Override
    public void deleteAuthor(int id) {
        Author existingAuthor = authorRepository.findById(id).orElseThrow(() -> new RuntimeException("No author with thad id"));
        authorRepository.deleteById(id);
    }


    private AuthorDTO converToAuthorDTO(Author author){
        return new AuthorDTO(author.getId(),author.getName(),author.getLastName(),author.getNationality(),author.getBiography(),author.getDeathDate(),author.getBirthDate(),author.getPhotoUrl(),author.getIsScriptwriter(),author.getIsDrawer());
    }
}
