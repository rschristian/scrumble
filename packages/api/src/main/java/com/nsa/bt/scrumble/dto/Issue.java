package com.nsa.bt.scrumble.dto;

public class Issue {
    private int iid;
    private String title;
    private String description;
    private int storyPoints;
    private int projectId;

    public int getIid() {
        return iid;
    }

    public void setId(int iid) {
        this.iid = iid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(int[] storyPoints) {
        this.storyPoints = storyPoints[0];
    }

    public int getProject() {
        return projectId;
    }

    public void setProject(int projectId) {
        this.projectId = projectId;
    }
}
