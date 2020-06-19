package com.bt.scrumble.core.issue;

import com.bt.scrumble.application.dto.Issue;
import com.bt.scrumble.application.dto.Project;
import org.springframework.stereotype.Service;

@Service
public interface IssueService {
    void setStoryPoint(Issue issue);

    void setProjectName(Issue issue, Project[] projects);

    void setStatus(Issue issue);

    String getFilterQuery(String filter);

    Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken);

    Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken);
}
