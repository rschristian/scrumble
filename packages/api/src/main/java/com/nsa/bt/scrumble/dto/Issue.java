package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

public class Issue implements Serializable {
    private int id;
    @JsonProperty("milestone")
    private Milestone milestone;
    @JsonAlias("project_id")
    private int projectId;
    private String title;
    private String description;
    private int storyPoint;
    private String state;
    private ArrayList<String> labels;

    public Issue(){}

    public Issue(int id, int projectId, String title, String description, int storyPoint, String state, ArrayList<String> labels) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.storyPoint = storyPoint;
        this.state = state;
        this.labels = labels;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
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

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public ArrayList<String> getLabels() {
        return labels;
    }

    public void setLabels(ArrayList<String> labels) {
        this.labels = labels;
    }
}
