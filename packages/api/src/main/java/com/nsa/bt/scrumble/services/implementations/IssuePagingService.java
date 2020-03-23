package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageResult;
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

@Service
public class IssuePagingService implements IIssuePagingService {

    private static final Logger logger = LoggerFactory.getLogger(IssuePagingService.class);

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
    public NextResource getNextResource(String requestUri, String linkHeader, int workspaceId, int currentProjectId, int prevPage) {
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
            // If it's the last project in the workspace, then 0 values for page and projectId will be
            // sent back to indicate there are no more issues to ask for
            if(isLastProject(workspaceId, currentProjectId)) {
                return nextResource;
            }
            // If it's not the last project in the workspace, try and find the next project that has query results
            nextResource = findNextProjectWithQueryResults(nextResource, workspaceId, currentProjectId, requestUri);
        }

        return nextResource;
    }

    @Override
    public String getNextProjectIssuesUri(String uri, int nextProjectId) {
        // Alter query uri to just query a different project and set the page to 1
        uri = uri.replaceAll("(?<=projects/)(.*)(?=/issues)", Integer.toString(nextProjectId));
        uri = uri.replaceAll("(?<=page=)(.*)(?=&)", "1");
        return uri;
    }

    @Override
    public NextResource findNextProjectWithQueryResults(NextResource nextResource, int workspaceId,  int projectId, String uri) {
        ArrayList<Issue> issues;
        boolean emptyResponse = true;

        while(emptyResponse) {
            if(isLastProject(workspaceId, projectId)) {
                return new NextResource();
            }
            projectId = getNextProjectId(workspaceId, projectId);
            uri = getNextProjectIssuesUri(uri, projectId);

            ResponseEntity<ArrayList<Issue>> issuesResponse = restTemplate.exchange(
                    uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});

            issues = issuesResponse.getBody();

            if (!issues.isEmpty()) {
                nextResource.setProjectId(projectId);
                nextResource.setPageNumber(1);
                emptyResponse = false;
            } else if (isLastProject(workspaceId, projectId)) {
                nextResource.setProjectId(0);
                nextResource.setPageNumber(0);
            }
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

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }

    @Override
    public IssuePageResult getNextProjectPageOfIssues(int workspaceId, int projectId, String queryUri) {
        ArrayList<Issue> issues;
        IssuePageResult issuePageResult = new IssuePageResult();
        boolean emptyResponse = true;

        while(emptyResponse) {
            projectId = getNextProjectId(workspaceId, projectId);
            queryUri = getNextProjectIssuesUri(queryUri, projectId);

            ResponseEntity<ArrayList<Issue>> issuesResponse = restTemplate.exchange(
                    queryUri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});

            issues = issuesResponse.getBody();
            issuePageResult.setIssues(issues);

            if (!issues.isEmpty()) {
                issuePageResult.setNextResource(getNextResource(queryUri, issuesResponse.getHeaders().getFirst("Link"), workspaceId, projectId, 1));
                emptyResponse = false;
            } else if(isLastProject(workspaceId, projectId)) {
                emptyResponse = false;
            }
        }
        return issuePageResult;
    }

    @Override
    public IssuePageResult getIssuePageResult(int workspaceId, int projectId, int page, String filter, String accessToken) {
        ArrayList<Issue> issues = new ArrayList<>();
        NextResource nextResource = new NextResource();
        nextResource.setPageSize(ISSUE_PAGE_SIZE);

        IssuePageResult issuePageResult = new IssuePageResult();

        boolean issuesEmpty = true;

        // Initial call for a workspaces issues will pass number 0 for page and project id.
        // SB works out which project it should start from
        page = getPageNumber(page);
        projectId = getProjectId(workspaceId, projectId);

        while (issuesEmpty) {
            String uri = String.format("%s/projects/%d/issues?%s&page=%d&access_token=%s",
                    gitLabApiUrl, projectId, getFilterQuery(filter), page, accessToken);

            ResponseEntity<ArrayList<Issue>> issuesResponse = getIssuesResponse(uri);
            issues = issuesResponse.getBody();

            if (issues.isEmpty()) {
                // If not the last project in workspace, find next project with results for query if exists
                if (!isLastProject(workspaceId, projectId)) {
                    issuePageResult = getNextProjectPageOfIssues(workspaceId, projectId, uri);
                    // If search for another project comes empty, then set a 0 value to indicate no further pages to client
                    if(issuePageResult.getIssues().isEmpty()) {
                        projectId = 0;
                    } else {
                        // If search comes up with results, set the project id to be requested that contains the next set of results
                        projectId = issuePageResult.getIssues().get(0).getProjectId();
                    }
                }
            } else {
                // Request was fruitful. Get next resource details. Next resource details provided by the Gitlab
                // next link if present. Or a search for the next project ensues.
                issuePageResult.setIssues(issues);
                issuePageResult.setNextResource(getNextResource(uri, issuesResponse.getHeaders().getFirst("Link"), workspaceId, projectId, page));
            }
            issuesEmpty = false;
        }
        issueService.filterAndSetStoryPoint(issues);
        return issuePageResult;
    }

    private ResponseEntity<ArrayList<Issue>> getIssuesResponse(String uri) {
        return restTemplate.exchange(
                uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
    }
}
