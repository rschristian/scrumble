package com.bt.scrumbleLts.dto;

public class Project {
    private final int id;
    private final String description;
    private final String name;
    private final String avatar_url = null;

    public Project(int id, String description, String name) {
        this.id = id;
        this.description = description;
        this.name = name;
    }
}
