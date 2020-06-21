package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.project.Project;
import org.springframework.stereotype.Service;

import java.util.OptionalInt;

@Service
public class DefaultIssueService implements IssueService {

  private static final String UNPLANNED = "unplanned";
  private static final String OPENED = "opened";
  private static final String CLOSED = "closed";

  // Ref: https://stackoverflow.com/a/5439547/11679751
  public static boolean isInteger(String s) {
    if (s.isEmpty()) {
      return false;
    }
    for (int i = 0; i < s.length(); i++) {
      if (i == 0 && s.charAt(i) == '-') {
        if (s.length() == 1) {
          return false;
        } else {
          continue;
        }
      }
      if (Character.digit(s.charAt(i), 10) < 0) {
        return false;
      }
    }
    return true;
  }

  @Override
  public void setStoryPoint(Issue issue) {
    OptionalInt storyPoint =
        issue.getLabels().stream()
            .filter(DefaultIssueService::isInteger)
            .mapToInt(Integer::parseInt)
            .findFirst();

    if (storyPoint.isPresent()) {
      issue.setStoryPoint(storyPoint.getAsInt());
    }
  }

  @Override
  public String getFilterQuery(String filter) {
    switch (filter) {
      case UNPLANNED:
        return "labels=unplanned";
      case OPENED:
        return "state=opened";
      case CLOSED:
        return "state=closed";
      default:
        return "scope=all";
    }
  }

  @Override
  public void setProjectName(Issue issue, Project[] projects) {
    for (Project project : projects) {
      if (issue.getProjectId() == project.getId()) {
        issue.setProjectName(project.getName());
        return;
      }
    }
  }

  // TODO Reevaluate this system of tags/status
  @Override
  public void setStatus(Issue issue) {
    if (issue.getLabels().contains("To Do")) {
      issue.setStatus("To Do");
    } else if (issue.getLabels().contains("Doing")) {
      issue.setStatus("Doing");
    }
  }
}
