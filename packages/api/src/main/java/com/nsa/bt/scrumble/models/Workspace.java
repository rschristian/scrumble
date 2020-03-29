package com.nsa.bt.scrumble.models;

public class Workspace {
    private int id;
    private User createdBy;
    private String name;
    private String description;

    public Workspace(int id, User createdBy, String name, String description) {
        this.id = id;
        this.createdBy = createdBy;
        this.name = name;
        this.description = description;
    }

    public Workspace() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
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
}
