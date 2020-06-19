package com.bt.scrumble.application.models;

import java.sql.Date;

public class Issue {
  private int id;
  private Date startTime;
  private Date endTime;

  public Issue(int id, Date startTime, Date endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Date getStartTime() {
    return startTime;
  }

  public void setStartTime(Date startTime) {
    this.startTime = startTime;
  }

  public Date getEndTime() {
    return endTime;
  }

  public void setEndTime(Date endTime) {
    this.endTime = endTime;
  }
}
