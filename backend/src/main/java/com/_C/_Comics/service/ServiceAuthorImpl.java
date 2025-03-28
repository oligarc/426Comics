package com._C._Comics.service;

import com._C._Comics.dto.AuthorDTO;
import com._C._Comics.entity.Author;
import com._C._Comics.repository.AuthorRepository;
import org.springframework.stereotype.Service;

@Service
public class ServiceAuthorImpl implements ServiceAuthor {

    private AuthorRepository authorRepository;

    public ServiceAuthorImpl(AuthorRepository v_authorRepository){
        this.authorRepository=v_authorRepository;
    }
    @Override
    public AuthorDTO getAuthorById(int id) {
        Author author = authorRepository.findById(id).orElseThrow(() -> new RuntimeException("Author not found"));
        return converToAuthorDTO(author);
    }

    private AuthorDTO converToAuthorDTO(Author author){
        return new AuthorDTO(author.getId(),author.getName(),author.getLastName(),author.getNationality(),author.getBiography(),author.getDeathDate(),author.getBirthDate(),author.getPhotoUrl(),author.getIsScriptwriter(),author.getIsDrawer());
    }
}
