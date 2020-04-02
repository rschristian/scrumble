package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;
import java.util.Date;
import java.text.SimpleDateFormat;

public class Issue implements Serializable {
    private int iid;
    @JsonAlias("milestone")
    private Sprint sprint;
    @JsonAlias("project_id")
    private int projectId;
    private String projectName;
    private String title;
    private String description;
    private int storyPoint;
    private String state;
    private ArrayList<String> labels;
    @JsonAlias("timeSpent")
    private int timeSpent;
    private String author;
    @JsonAlias("created_at")
    private String createdAt;
    private String assignee;

    public Issue(){}

    public Issue(int iid, Sprint sprint, int projectId, String projectName, String title, String description, int storyPoint, String state, ArrayList<String> labels, int timeSpent, String author, String createdAt, String assignee) {
        this.iid = iid;
        this.sprint = sprint;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.storyPoint = storyPoint;
        this.state = state;
        this.labels = labels;
        this.timeSpent = timeSpent;
        this.author = author;
        this.createdAt = createdAt;
        this.assignee = assignee;
        this.projectName = projectName;
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

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
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

    public int getTimeSpent() {
        return timeSpent;
    }

    @JsonProperty("time_stats")
    public void setTimeSpent(Map<String, Object> timeSpent) {
        if(timeSpent != null) {
            this.timeSpent = (Integer)timeSpent.get("total_time_spent");
        } else {
            this.timeSpent = 0;
        }
        
    }

    @JsonAlias("timeSpent")
    public void setTimeSpent(int timeSpent) {
        this.timeSpent = timeSpent;
    }

    public String getAuthor() {
        return author;
    }

    @JsonProperty("author")
    public void setAuthor(Map<String, Object> author) {
        this.author = (String)author.get("name");
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate= formatter.format(createdAt);
        this.createdAt = strDate;
    }

    public String getAssignee() {
        return assignee;
    }

    @JsonProperty("assignee")
    public void setAssignee(Map<String, Object> assignedTo) {
        if (assignedTo != null) {
            this.assignee = (String)assignedTo.get("name");
        } else {
            this.assignee = "Unassigned";
        }
    }
}
