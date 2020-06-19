package com.bt.scrumble.application.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
public class IssueData {
  private int id;
  private Date startTime;
  private Date endTime;
}
