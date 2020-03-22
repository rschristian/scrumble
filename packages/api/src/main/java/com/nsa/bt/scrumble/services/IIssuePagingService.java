package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.NextResource;

import java.util.HashMap;

public interface IIssuePagingService {

    int getNextProjectId(int workspaceId, int prevProjectId);

    int getPageNumber(int requestedPage);

    int getProjectId(int workspaceId, int requestedPage);

    NextResource getNextResource(String linkHeader, int workspaceId, int currentProjectId, int prevPage);

    String getFilterQuery(String filter);

    boolean isLastProject(int workspaceId, int projectId);

    HashMap<Object, Object> issuePageResponse(int workspaceId, int projectId, int page, String filter,  String accessToken);
}
