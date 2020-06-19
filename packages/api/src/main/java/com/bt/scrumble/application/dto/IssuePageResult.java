package com.bt.scrumble.application.dto;

import java.util.ArrayList;

public class IssuePageResult {
  private ArrayList<Issue> issues;
  private NextResource nextResource;

  public IssuePageResult(ArrayList<Issue> issues, NextResource nextResource) {
    this.issues = issues;
    this.nextResource = nextResource;
  }

  public IssuePageResult() { }

  public ArrayList<Issue> getIssues() {
    return issues;
  }

  public void setIssues(ArrayList<Issue> issues) {
    this.issues = issues;
  }

  public NextResource getNextResource() {
    return nextResource;
  }

  public void setNextResource(NextResource nextResource) {
    this.nextResource = nextResource;
  }
}
