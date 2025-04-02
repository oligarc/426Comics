package com._C._Comics.dto;

public class PublisherDTO {

    private Integer id;
    private String name;
    private String websiteUrl;
    private String businessPlace;
    private Integer postalCode;
    private String town;
    private String province;
    private String telephone;
    private String logoUrl;


    public PublisherDTO(){

    }

    public PublisherDTO(Integer id, String name, String websiteUrl, String businessPlace, Integer postalCode, String town, String province, String telephone,String logoUrl) {
        this.id = id;
        this.name = name;
        this.websiteUrl = websiteUrl;
        this.businessPlace = businessPlace;
        this.postalCode = postalCode;
        this.town = town;
        this.province = province;
        this.telephone = telephone;
        this.logoUrl=logoUrl;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getBusinessPlace() {
        return businessPlace;
    }

    public void setBusinessPlace(String businessPlace) {
        this.businessPlace = businessPlace;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}
