package com._C._Comics.service;

import com._C._Comics.dto.PublisherDTO;
import com._C._Comics.entity.Publisher;
import com._C._Comics.repository.PublisherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicePublisherImpl implements ServicePublisher {

    private PublisherRepository publisherRepository;

    public ServicePublisherImpl(PublisherRepository v_publisherRepository){
        this.publisherRepository=v_publisherRepository;
    }

    @Override
    public List<PublisherDTO> getAllPublishers() {
        List<Publisher> publishers = publisherRepository.findAll();
        return publishers.stream().map(this::converToPublisherDTO).toList();
    }

    @Override
    public List<PublisherDTO> getPublisherByName(String name) {
        List<Publisher> publishers = publisherRepository.findByNameContainingIgnoreCase(name);
        return publishers.stream().map(this::converToPublisherDTO).toList();
    }

    @Override
    public List<PublisherDTO> getPublishersByPostalCode(int postalCode) {
        List<Publisher> publishers = publisherRepository.findByPostalCode(postalCode);
        return publishers.stream().map(this::converToPublisherDTO).toList();
    }

    @Override
    public List<PublisherDTO> getPublishersByTown(String town) {
        List<Publisher> publishers = publisherRepository.findByTownContainingIgnoreCase(town);
        return publishers.stream().map(this::converToPublisherDTO).toList();
    }

    @Override
    public List<PublisherDTO> getPublishersByProvince(String province) {
        List<Publisher> publishers = publisherRepository.findByProvinceContainingIgnoreCase(province);
        return publishers.stream().map(this::converToPublisherDTO).toList();
    }

    @Override
    public String getPublisherNameById(int id) {
        return publisherRepository.findById(id)
                .map(Publisher::getName)
                .orElse("Nombre no encontrado");
    }


    @Override
    public Publisher addPublisher(Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @Override
    public Publisher updatePublisher(Publisher publisher, int id) {
        Publisher existingPublisher = publisherRepository.findById(id).orElseThrow(() -> new RuntimeException("No publisher with that id"));
        existingPublisher.setName(publisher.getName());
        existingPublisher.setBusinessPlace(publisher.getBusinessPlace());
        existingPublisher.setPostalCode(publisher.getPostalCode());
        existingPublisher.setProvince(publisher.getProvince());
        existingPublisher.setTown(publisher.getTown());
        existingPublisher.setWebsiteUrl(publisher.getWebsiteUrl());
        existingPublisher.setTelephone(publisher.getTelephone());
        return publisherRepository.save(existingPublisher);
    }

    @Override
    public void deletePublisher(int id) {
        Publisher existingPublisher = publisherRepository.findById(id).orElseThrow( () -> new RuntimeException("No publisher with that id"));
        publisherRepository.deleteById(id);
    }

    private PublisherDTO converToPublisherDTO(Publisher publisher){
        return new PublisherDTO(publisher.getId(),publisher.getName(),publisher.getWebsiteUrl(),publisher.getBusinessPlace(),publisher.getPostalCode(),publisher.getTown(),publisher.getProvince(),publisher.getTelephone(),publisher.getLogoUrl());
    }
}
