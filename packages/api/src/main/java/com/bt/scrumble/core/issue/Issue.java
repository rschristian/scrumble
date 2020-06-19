package com.bt.scrumble.core.issue;

import com.bt.scrumble.application.data.SprintData;
import com.bt.scrumble.application.data.UserData;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Issue implements Serializable {
  private int iid;
  @JsonAlias("milestone")
  private SprintData sprint;
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
  private UserData assignee;

  public Issue(int projectId, String title, String description, int storyPoint, String status) {
    this.projectId = projectId;
    this.title = title;
    this.description = description;
    this.storyPoint = storyPoint;
    this.status = status;
  }

  @JsonProperty("time_stats")
  public void setTimeSpent(Map<String, Object> timeSpent) {
    this.timeSpent = (timeSpent != null)
        ? (Integer) timeSpent.get("total_time_spent")
        : 0;
  }

  @JsonAlias("timeSpent")
  public void setTimeSpent(int timeSpent) {
    this.timeSpent = timeSpent;
  }

  @JsonProperty("author")
  public void setAuthor(Map<String, Object> author) {
    this.author = author;
  }

  public void setCreatedAt(Date createdAt) {
    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    this.createdAt = formatter.format(createdAt);
  }

  public void setAssignee(UserData assignedTo) {
    if (assignedTo != null) {
      this.assignee = assignedTo;
    }
  }
}
