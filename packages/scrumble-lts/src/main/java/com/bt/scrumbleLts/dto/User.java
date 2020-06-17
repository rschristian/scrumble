package com.bt.scrumbleLts.dto;

public class User {
    private final int id;
    private final String name;
    private final String username;
    private final String avatar_url;

    public User() {
        this.id = 5;
        this.name = "Smoke Test";
        this.username = "smoketester";
        this.avatar_url = "https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=46&d=identicon";
    }
}
