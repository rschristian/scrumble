package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;
import java.util.ArrayList;

public class User implements Serializable {
    private final int id;
    private final String name;
    private final String username;
    @JsonAlias("avatar_url")
    private final String avatarUrl;
    private final ArrayList<Integer> projectIds;

    public User(int id, String name, String username,
                String avatarUrl, ArrayList<Integer> projectIds) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.projectIds = projectIds;
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

    public ArrayList<Integer> getProjectIds() {
        return projectIds;
    }
}
