package com.bt.scrumble.services;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.Project;
import org.springframework.stereotype.Service;

@Service
public interface IIssueService {
  void setStoryPoint(Issue issue);

  void setProjectName(Issue issue, Project[] projects);

  void setStatus(Issue issue);

  String getFilterQuery(String filter);

  Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken);

  Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken);
}
