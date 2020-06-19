package com.bt.scrumble.application.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class SprintData {
  private int id;
  private String title;
  private String description;
  private String status;
  private Date startDate;
  private Date dueDate;
  private Map<String, Integer> projectIdToMilestoneIds;
}
