package com.bt.scrumble.services;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.Project;
import io.opentracing.Span;
import org.springframework.stereotype.Service;

@Service
public interface IIssueService {
    void setStoryPoint(Issue issue, Span span);

    void setProjectName(Issue issue, Project[] projects, Span span);

    void setStatus(Issue issue);

    String getFilterQuery(String filter, Span span);

    Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken, Span span);

    Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken, Span span);
}
