package com._C._Comics.dto;

import java.time.LocalDate;
import java.util.List;

public class AuthorDTO {

    private Integer id;
    private String name;
    private String lastName;
    private String nationality;
    private LocalDate birthDate;
    private LocalDate deathDate;
    private String biography;
    private String photoUrl;
    private Boolean isScriptwriter;
    private Boolean isDrawer;

    public AuthorDTO(){

    }

    public AuthorDTO(Integer id,String name, String lastName, String nationality, String biography, LocalDate deathDate, LocalDate birthDate, String photoUrl, Boolean isScriptwriter, Boolean isDrawer) {
        this.id=id;
        this.name = name;
        this.lastName = lastName;
        this.nationality = nationality;
        this.biography = biography;
        this.deathDate = deathDate;
        this.birthDate = birthDate;
        this.photoUrl = photoUrl;
        this.isScriptwriter = isScriptwriter;
        this.isDrawer = isDrawer;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Boolean getScriptwriter() {
        return isScriptwriter;
    }

    public void setScriptwriter(Boolean scriptwriter) {
        isScriptwriter = scriptwriter;
    }

    public Boolean getDrawer() {
        return isDrawer;
    }

    public void setDrawer(Boolean drawer) {
        isDrawer = drawer;
    }
}
