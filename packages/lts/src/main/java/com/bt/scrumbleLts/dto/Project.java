package com.bt.scrumbleLts.dto;

public class Project {
    private final int id;
    private final String name;
    private final String description;
    private final String avatar_url = null;

    public Project(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
