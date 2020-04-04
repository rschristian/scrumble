package com.nsa.bt.scrumble.models;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Map;

public class Sprint {
    private long id;
    private String title;
    private String description;
    private String status;
    private Date startDate;
    private Date dueDate;
    private ArrayList<Map<Integer, Integer>> projectMilestoneIds;

    public Sprint(long id, String title, String description, String status, Date startDate, Date dueDate, ArrayList<Map<Integer, Integer>> projectMilestoneIds) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.projectMilestoneIds = projectMilestoneIds;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public ArrayList<Map<Integer, Integer>> getProjectMilestoneIds() {
        return projectMilestoneIds;
    }

    public void setProjectMilestoneIds(ArrayList<Map<Integer, Integer>> projectMilestoneIds) {
        this.projectMilestoneIds = projectMilestoneIds;
    }
}
