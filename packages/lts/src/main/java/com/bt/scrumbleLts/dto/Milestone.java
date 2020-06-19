package com.bt.scrumbleLts.dto;

import java.util.Map;

public class Sprint {
  private final int id;
  private final String title;
  private final String description;
  private final String status;
  private final String startDate;
  private final String dueDate;
  private final Map<String, Integer> projectIdToMilestoneIds;

  public Sprint(
      int id,
      String title,
      String description,
      String status,
      String startDate,
      String dueDate,
      Map<String, Integer> projectIdToMilestoneIds) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.projectIdToMilestoneIds = projectIdToMilestoneIds;
  }
}
