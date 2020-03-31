package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;

public class ScrumbleUser implements Serializable {
    private int id;
    private String name;
    private String username;
    @JsonAlias("avatar_url")
    private String avatarUrl;

    public ScrumbleUser (int id, String name, String username,  String avatarUrl) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }


    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getUsername() {
        return this.username;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }
}
