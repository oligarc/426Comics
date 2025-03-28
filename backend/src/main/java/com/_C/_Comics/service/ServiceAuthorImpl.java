package com._C._Comics.service;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.entity.Author;
import com._C._Comics.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceAuthorImpl implements ServiceAuthor {

    private AuthorRepository authorRepository;

    public ServiceAuthorImpl(AuthorRepository v_authorRepository){
        this.authorRepository=v_authorRepository;
    }

    @Override
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream().map(this::converToAuthorDTO).toList();
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
    public List<AuthorDTO> getAuthorsWhoAreScripters() {
        List<Author> authors = authorRepository.findByIsScriptwriter(true);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    @Override
    public List<AuthorDTO> getAuthorsWhoAreDrawers() {
        List<Author> authors = authorRepository.findByIsDrawer(true);
        return authors.stream().map(this::converToAuthorDTO).toList();
    }

    private AuthorDTO converToAuthorDTO(Author author){
        return new AuthorDTO(author.getId(),author.getName(),author.getLastName(),author.getNationality(),author.getBiography(),author.getDeathDate(),author.getBirthDate(),author.getPhotoUrl(),author.getIsScriptwriter(),author.getIsDrawer());
    }
}
