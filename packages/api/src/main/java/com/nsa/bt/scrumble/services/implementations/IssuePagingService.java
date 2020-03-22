package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.NextResource;
import com.nsa.bt.scrumble.services.IIssuePagingService;
import com.nsa.bt.scrumble.services.IIssueService;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import com.nsa.bt.scrumble.util.GitLabLinkParser;
import com.nsa.bt.scrumble.util.GitLabLinks;

import org.apache.commons.lang3.ArrayUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

@Service
public class IssuePagingService implements IIssuePagingService {

    private static final Logger logger = LoggerFactory.getLogger(IIssuePagingService.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IWorkspaceService workspaceService;

    @Autowired
    IIssueService issueService;

    private static final int ISSUE_PAGE_SIZE = 20;
    private static final String UNPLANNED = "unplanned";
    private static final String OPENED = "opened";
    private static final String CLOSED = "closed";

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Override
    public int getNextProjectId(int workspaceId, int prevProjectId) {
        int[] workspaceProjectIds = workspaceService.getProjectIdsForWorkspace(workspaceId);
        return workspaceProjectIds[(ArrayUtils.indexOf(workspaceProjectIds, prevProjectId) + 1)];
    }

    @Override
    public int getPageNumber(int requestedPage) {
        if (requestedPage == 0) {
            return 1;
        }
        return requestedPage;
    }

    @Override
    public int getProjectId(int workspaceId, int requestedPage) {
        if (requestedPage == 0) {
            return workspaceService.getProjectIdsForWorkspace(workspaceId)[0];
        }
        return requestedPage;
    }

    @Override
    public NextResource getNextResource(String linkHeader, int workspaceId, int currentProjectId, int prevPage) {
        NextResource nextResource = new NextResource();
        nextResource.setPageSize(ISSUE_PAGE_SIZE);

        GitLabLinkParser linkParser = new GitLabLinkParser();
        GitLabLinks links = linkParser.parseLink(linkHeader);

        boolean nextPagePresent = links.getNext() != null && !links.getNext().isEmpty();

        if (nextPagePresent) {
            // Still more issues for same project, get the next page
            nextResource.setProjectId(currentProjectId);
            nextResource.setPageNumber(prevPage + 1);
        } else if (isLastProject(workspaceId, currentProjectId)) {
            // On the last project in the workspace and no more issues for it
            nextResource.setProjectId(0);
            nextResource.setPageNumber(0);
        } else {
            // No more issues for the project requested.
            // It is not the last project in the workspace, so move on to fetch first page of next project
            nextResource.setProjectId(getNextProjectId(workspaceId, currentProjectId));
            nextResource.setPageNumber(1);
        }

        return nextResource;
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
    public boolean isLastProject(int workspaceId, int projectId) {
        int[] workspaceProjectIds = workspaceService.getProjectIdsForWorkspace(workspaceId);
        return ArrayUtils.indexOf(workspaceProjectIds, projectId) == workspaceProjectIds.length - 1;
    }

//    @Override
//    public HashMap<Object, Object> issuePageResponse(int workspaceId, int projectId, int page, String filter, String accessToken) {
//        // If both page and project are 0, it is the clients first request for a workspaces' issues.
//        // SB must set these initial values.
//        page = getPageNumber(page);
//        projectId = getProjectId(workspaceId, projectId);
//
//        ArrayList<Issue> issues = new ArrayList<>();
//        NextResource nextResource = new NextResource();
//
//        String uri = String.format("%s/projects/%d/issues?%s&page=%d&access_token=%s",
//                gitLabApiUrl, projectId, getFilterQuery(filter), page, accessToken);
//
//        while (issues.isEmpty() && !isLastProject(workspaceId, projectId)) {
//            logger.info("Still size 0");
//            ResponseEntity<ArrayList<Issue>> issuesResponse = restTemplate.exchange(
//                    uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
//            issues = issuesResponse.getBody();
//            for (Issue issue : issues) {
//                logger.info(String.format("Issue: %d", issue.getId()));
//            }
//            if(isLastProject(workspaceId, projectId)) {
//                projectId = 0;
//                nextResource = new NextResource();
//            } else {
//                projectId = getNextProjectId(workspaceId, projectId);
//                nextResource = getNextResource(issuesResponse.getHeaders().getFirst("Link"), workspaceId, projectId, page);
//            }
//        }
//
//        issueService.filterAndSetStoryPoint(issues);
//
//        var res = new HashMap<>();
//        res.put("issues", issues);
//        res.put("projectPageData", nextResource);
//
//        return res;
//    }

    @Override
    public HashMap<Object, Object> issuePageResponse(int workspaceId, int projectId, int page, String filter, String accessToken) {
        // If both page and project are 0, it is the clients first request for a workspaces' issues.
        // SB must set these initial values.
        page = getPageNumber(page);
        projectId = getProjectId(workspaceId, projectId);

        ArrayList<Issue> issues = new ArrayList<>();
        NextResource nextResource = new NextResource();

        String uri = String.format("%s/projects/%d/issues?%s&page=%d&access_token=%s",
                gitLabApiUrl, projectId, getFilterQuery(filter), page, accessToken);

        ResponseEntity<ArrayList<Issue>> issuesResponse = restTemplate.exchange(
                uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});

        issues = issuesResponse.getBody();
        issueService.filterAndSetStoryPoint(issues);

        nextResource = getNextResource(issuesResponse.getHeaders().getFirst("Link"), workspaceId, projectId, page);

        var res = new HashMap<>();
        res.put("issues", issues);
        res.put("projectPageData", nextResource);

        return res;
    }

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }
}
