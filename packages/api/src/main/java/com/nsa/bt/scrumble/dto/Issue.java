package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

public class Issue implements Serializable {
    private int iid;
    @JsonAlias("milestone")
    private Sprint sprint;
    @JsonAlias("project_id")
    private int projectId;
    private String title;
    private String description;
    private int storyPoint;
    @JsonAlias("state")
    private String status;
    private ArrayList<String> labels;
    private int timeSpent;

    public Issue(){}

    public Issue(int iid, Sprint sprint, int projectId, String title, String description, int storyPoint, String status, ArrayList<String> labels, int timeSpent) {
        this.iid = iid;
        this.sprint = sprint;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.storyPoint = storyPoint;
        this.status = status;
        this.labels = labels;
        this.timeSpent = timeSpent;
    }

    public int getIid() {
        return iid;
    }

    public void setIid(int iid) {
        this.iid = iid;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public ArrayList<String> getLabels() {
        return labels;
    }

    public void setLabels(ArrayList<String> labels) {
        this.labels = labels;
    }

    public int getTimeSpent() {
        return timeSpent;
    }

    @JsonProperty("time_stats")
    public void setTimeSpent(Map<String, String> timeSpent) {
        this.timeSpent = Integer.parseInt(timeSpent.get("total_time_spent"));
    }

    @JsonAlias("timeSpent")
    public void setTimeSpent(int timeSpent) {
        this.timeSpent = timeSpent;
    }
}
