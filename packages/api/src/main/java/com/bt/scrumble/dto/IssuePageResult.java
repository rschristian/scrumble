package com.bt.scrumble.dto;

import java.util.ArrayList;

public class IssuePageResult {
  private final ArrayList<Issue> issues;
  private NextResource nextResource;

  public IssuePageResult() {
    this.issues = new ArrayList<>();
  }

  public ArrayList<Issue> getIssues() {
    return issues;
  }

  public void appendIssues(ArrayList<Issue> issues) {
    this.issues.addAll(issues);
  }

  public NextResource getNextResource() {
    return nextResource;
  }

  public void setNextResource(NextResource nextResource) {
    this.nextResource = nextResource;
  }
}
