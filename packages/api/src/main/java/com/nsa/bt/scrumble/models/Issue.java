package com.nsa.bt.scrumble.models;

import java.sql.Date;

public class Issue {
    private int id;
    private Date startDate;
    private Date dueDate;

    public Issue(int id, Date startDate, Date dueDate) {
        this.id = id;
        this.startDate = startDate;
        this.dueDate = dueDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}