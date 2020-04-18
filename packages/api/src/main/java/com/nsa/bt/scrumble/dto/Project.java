package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;

public class Project implements Serializable {
    private int id;
    private String description;
    private String name;
    @JsonAlias("avatar_url")
    private String avatarUrl;

    public Project(final int id, final String name, final String description, final String avatarUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.avatarUrl = avatarUrl;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(final String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}
