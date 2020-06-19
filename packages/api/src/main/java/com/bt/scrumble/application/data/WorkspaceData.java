package com.bt.scrumble.application.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class WorkspaceData {
  private int id;
  private UserData createdBy;
  private String name;
  private String description;
  private ArrayList<Integer> projectIds;
  private List<UserData> users;
}
