package com.nsa.bt.scrumble.dto;

public class Issue {
    private int id;
    private String name;
    private String description;
    private int storyPoint;
    private String project;

    public Issue(int id, String name, String description, int storyPoint, String project) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.storyPoint = storyPoint;
        this.project = project;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }
}
