package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;

public class ScrumbleUser implements Serializable {
    private final int id;
    private final String name;
    private final String username;
    @JsonAlias("avatar_url")
    private final String avatarUrl;

    public ScrumbleUser(final int id, final String name, final String username, final String avatarUrl) {
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
