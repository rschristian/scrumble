package com.bt.scrumble.core.issue;

import com.bt.scrumble.core.project.Project;
import org.springframework.stereotype.Service;

@Service
public interface IssueService {
  void setStoryPoint(Issue issue);

  void setProjectDetails(Issue issue, Project[] projects);

  void setStatus(Issue issue);

  String getFilterQuery(String filter);
}
