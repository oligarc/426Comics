package com._C._Comics.dto;

public class UserCollectionDTO {

    private Integer comicId;
    private String state; //Will come up from the user logged

    public Integer getComicId() {
        return comicId;
    }

    public void setComicId(Integer comicId) {
        this.comicId = comicId;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
