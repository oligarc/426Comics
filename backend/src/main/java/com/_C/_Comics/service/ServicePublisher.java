package com._C._Comics.service;

import com._C._Comics.dto.PublisherDTO;
import com._C._Comics.models.Publisher;

import java.util.List;

public interface ServicePublisher {
    public List<PublisherDTO> getAllPublishers();
    public List<PublisherDTO> getPublisherByName(String name);
    public List<PublisherDTO> getPublishersByPostalCode(int postalCode);
    public List<PublisherDTO> getPublishersByTown(String town);
    public List<PublisherDTO> getPublishersByProvince(String province);
    public String getPublisherNameById(int id);
    public Publisher addPublisher(Publisher publisher);
    public Publisher updatePublisher(Publisher publisher,int id);
    public void deletePublisher(int id);
}
