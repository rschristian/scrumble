package com.bt.scrumble.core.issuePaging;

public interface IssuePagingService {
    NextResource findNextProjectWithQueryResults(
            NextResource nextResource, int workspaceId, int projectId, String uri);

    String getNextProjectIssuesUri(String uri, int nextProjectId);

    int getNextProjectId(int workspaceId, int prevProjectId);

    boolean isLastProject(int workspaceId, int projectId);

    IssuePageResult getPageOfIssues(
      int workspaceId,
      int projectId,
      int page,
      String filter,
      String searchTerm,
      String accessToken);
}
