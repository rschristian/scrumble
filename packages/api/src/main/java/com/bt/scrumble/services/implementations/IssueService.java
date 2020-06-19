package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.Project;
import com.bt.scrumble.services.IIssueService;
import com.bt.scrumble.services.ISprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.OptionalInt;

@Service
public class IssueService implements IIssueService {

  private static final String UNPLANNED = "unplanned";
  private static final String OPENED = "opened";
  private static final String CLOSED = "closed";

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  // Causes circular dependency if consturctor
  @Autowired private ISprintService sprintService;

  public static boolean isInteger(String s) {
    if (s.isEmpty()) return false;
    for (int i = 0; i < s.length(); i++) {
      if (i == 0 && s.charAt(i) == '-') {
        if (s.length() == 1) {
          return false;
        } else continue;
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
            .filter(IssueService::isInteger)
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

  @Override
  public void setStatus(Issue issue) {
    if (issue.getLabels().contains("opened")) {
      issue.setStatus("opened");
    } else if (issue.getLabels().contains("To Do")) {
      issue.setStatus("To Do");
    } else if (issue.getLabels().contains("Doing")) {
      issue.setStatus("Doing");
    } else if (issue.getLabels().contains("closed")) {
      issue.setStatus("closed");
    } else {
      issue.setStatus("opened");
    }
  }

  private String getIssueUri(int workspaceId, int projectId, Issue issue, String accessToken) {
    if (issue.getSprint() != null) {
      int milestoneId =
          sprintService.getMilestoneId(workspaceId, projectId, issue.getSprint().getId());

      return String.format(
          "%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&milestone_id=%d&access_token=%s",
          gitLabApiUrl,
          projectId,
          issue.getTitle(),
          issue.getDescription(),
          issue.getStoryPoint(),
          issue.getAssignee().getId(),
          milestoneId,
          accessToken);
    } else {

      return String.format(
          "%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&access_token=%s",
          gitLabApiUrl,
          projectId,
          issue.getTitle(),
          issue.getDescription(),
          issue.getStoryPoint(),
          issue.getAssignee().getId(),
          accessToken);
    }
  }
}
