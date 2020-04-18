package com.nsa.bt.scrumble.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nsa.bt.scrumble.models.Sprint;

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
    @JsonAlias("state")
    private String status;
    private ArrayList<String> labels;
    @JsonAlias("timeSpent")
    private int timeSpent;
    private Object author;
    @JsonAlias("created_at")
    private String createdAt;
    private User assignee;

    public Issue() { }

    public Issue(final int projectId, final String title, final String description,
                 final int storyPoint, final String status) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.storyPoint = storyPoint;
        this.status = status;
    }

    public Issue(final int iid, final Sprint sprint, final int projectId,
                 final String projectName, final String title,
                 final String description, final int storyPoint, final String state,
                 final ArrayList<String> labels, final int timeSpent, final String author,
                 final String createdAt, final User assignee) {
        this.iid = iid;
        this.sprint = sprint;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.storyPoint = storyPoint;
        this.status = state;
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

    public void setIid(final int iid) {
        this.iid = iid;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(final Sprint sprint) {
        this.sprint = sprint;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(final int projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(final String projectName) {
        this.projectName = projectName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public int getStoryPoint() {
        return storyPoint;
    }

    public void setStoryPoint(final int storyPoint) {
        this.storyPoint = storyPoint;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public ArrayList<String> getLabels() {
        return labels;
    }

    public void setLabels(final ArrayList<String> labels) {
        this.labels = labels;
    }

    public int getTimeSpent() {
        return timeSpent;
    }


    @JsonProperty("time_stats")
    public void setTimeSpent(final Map<String, Object> timeSpent) {
        this.timeSpent = (timeSpent != null) ? (Integer) timeSpent.get("total_time_spent") : 0;
    }

    @JsonAlias("timeSpent")
    public void setTimeSpent(final int timeSpent) {
        this.timeSpent = timeSpent;
    }

    public Object getAuthor() {
        return author;
    }

    @JsonProperty("author")
    public void setAuthor(final Map<String, Object> author) {
        this.author = author;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final Date createdAt) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        this.createdAt = formatter.format(createdAt);
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(final User assignedTo) {
        if (assignedTo != null) {
            this.assignee = assignedTo;
        }
    }
}
