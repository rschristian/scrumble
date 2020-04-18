package com.nsa.bt.scrumble.models;

import java.sql.Date;
import java.util.Map;

public class Sprint {
    private int id;
    private String title;
    private String description;
    private String status;
    private Date startDate;
    private Date dueDate;
    private Map<String, Integer> projectIdToMilestoneIds;

    public Sprint(final int id, final String title, final String description,
                  final String status, final Date startDate, final Date dueDate,
                  final Map<String, Integer>  projectIdToMilestoneIds) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.projectIdToMilestoneIds = projectIdToMilestoneIds;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(final String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(final Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(final Date dueDate) {
        this.dueDate = dueDate;
    }

    public Map<String, Integer> getProjectIdToMilestoneIds() {
        return projectIdToMilestoneIds;
    }

    public void setProjectIdToMilestoneIds(final Map<String, Integer> projectIdToMilestoneIds) {
        this.projectIdToMilestoneIds = projectIdToMilestoneIds;
    }
}
