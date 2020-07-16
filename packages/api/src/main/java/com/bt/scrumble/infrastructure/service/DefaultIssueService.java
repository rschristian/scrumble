package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.project.Project;
import org.springframework.stereotype.Service;

import java.util.OptionalInt;

@Service
public class DefaultIssueService implements IssueService {

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
      case "None":
        return "milestone=None";
      case "opened":
        return "state=opened";
      case "closed":
        return "state=closed";
      default:
        return "scope=all";
    }
  }

  @Override
  public void setProjectDetails(Issue issue, Project[] projects) {
    for (Project project : projects) {
      if (issue.getProject().getId() == project.getId()) {
        issue.getProject().setName(project.getName());
        issue.getProject().setDescription(project.getDescription());
        issue.getProject().setAvatarUrl(project.getAvatarUrl());
        return;
      }
    }
  }

  // TODO Reevaluate this system of tags/status
  @Override
  public void setStatus(Issue issue) {
    if (issue.getLabels().contains("To Do")) {
      issue.setState("To Do");
    } else if (issue.getLabels().contains("Doing")) {
      issue.setState("Doing");
    }
  }
}
