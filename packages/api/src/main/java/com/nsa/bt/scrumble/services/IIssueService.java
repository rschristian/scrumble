package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.Project;
import io.opentracing.Span;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface IIssueService {

    void setStoryPoint(Issue issue, Span span);

    void setProjectName(Issue issue, Project[] projects, Span span);

    String getFilterQuery(String filter, Span span);

    Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken, Span span);

    Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken, Span span);
}
