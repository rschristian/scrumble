package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
    private int id;
    private String name;
    private String username;
    private String state;
    @JsonAlias("avatar_url")
    private String avatarUrl;
    @JsonAlias("created_at")
    private Date createdAt;
    private String bio;
    private String location;
    @JsonAlias("public_email")
    private String publicEmail;
    private String skype;
    private String linkedin;
    private String twitter;
    @JsonAlias("website_url")
    private String websiteUrl;
    private String organization;

    public User (int id, String name, String username, String state, String avatarUrl,
                Date createdAt, String bio, String location, String publicEmail,
                String skype, String linkedin, String twitter, String websiteUrl,
                String organization) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.state = state;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
        this.bio = bio;
        this.location = location;
        this.publicEmail = publicEmail;
        this.skype = skype;
        this.linkedin = linkedin;
        this.twitter = twitter;
        this.websiteUrl = websiteUrl;
        this.organization = organization;
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

    public String getState() {
        return this.state;
    }

    public String getAvatarUrl() {
        return this.avatarUrl;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public String getBio() {
        return this.bio;
    }

    public String getLocation() {
        return this.location;
    }

    public String getPublicEmail() {
        return this.publicEmail;
    }

    public String getSkype() {
        return this.skype;
    }

    public String getLinkedin() {
        return this.linkedin;
    }

    public String getTwitter() {
        return this.twitter;
    }

    public String getWebsiteUrl() {
        return this.websiteUrl;
    }

    public String getOrganization() {
        return this.organization;
    }
}
