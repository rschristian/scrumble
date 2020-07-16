package com.bt.scrumble.core.issue;

import com.bt.scrumble.application.data.SprintData;
import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.project.Project;
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
  private String title;
  private String description;
  private String state;
  private Object author;
  private UserData assignee;
  @JsonAlias("created_at")
  private String createdAt;
  @JsonAlias("timeSpent")
  private int timeSpent;
  private int storyPoint;
  private Project project = new Project();
  @JsonAlias("milestone")
  private SprintData sprint;
  private ArrayList<String> labels;

  public Issue(String title, String description, int storyPoint, String state) {
    this.title = title;
    this.description = description;
    this.storyPoint = storyPoint;
    this.state = state;
  }

  @JsonProperty("project_id")
  public void setProjectId(int projectId) {
    this.project.setId(projectId);
  }

  @JsonProperty("time_stats")
  public void setTimeSpent(Map<String, Object> timeSpent) {
    this.timeSpent = (timeSpent != null) ? (Integer) timeSpent.get("total_time_spent") : 0;
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
