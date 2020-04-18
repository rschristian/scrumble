package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.IssuePageResult;
import com.nsa.bt.scrumble.dto.NextResource;
import io.opentracing.Span;

public interface IIssuePagingService {

    NextResource findNextProjectWithQueryResults(NextResource nextResource, int workspaceId,  int projectId, String uri, Span span);

    String getNextProjectIssuesUri(String uri, int nextProjectId, Span span);

    int getNextProjectId(int workspaceId, int prevProjectId, Span span);

    boolean isLastProject(int workspaceId, int projectId, Span span);

    IssuePageResult getPageOfIssues(int workspaceId, int projectId, int page, String filter, String searchTerm, String accessToken, Span span);
}
