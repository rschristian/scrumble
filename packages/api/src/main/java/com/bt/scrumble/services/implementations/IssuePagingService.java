package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.IssuePageResult;
import com.bt.scrumble.dto.NextResource;
import com.bt.scrumble.dto.Project;
import com.bt.scrumble.services.*;
import com.bt.scrumble.util.GitLabLinkParser;
import com.bt.scrumble.util.GitLabLinks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class IssuePagingService implements IIssuePagingService {

  private static final int ISSUE_PAGE_SIZE = 20;
  @Autowired private RestTemplate restTemplate;

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired private IWorkspaceService workspaceService;
  @Autowired private IIssueService issueService;
  @Autowired private ISprintService sprintService;
  @Autowired private IUserService userService;

  @Override
  public int getNextProjectId(int workspaceId, int prevProjectId) {
    ArrayList<Integer> workspaceProjectIds =
        workspaceService.getProjectIdsForWorkspace(workspaceId);
    var nextProjectId = workspaceProjectIds.get(workspaceProjectIds.lastIndexOf(prevProjectId) + 1);
    return nextProjectId;
  }

  public NextResource getNextResource(
      String requestUri, String linkHeader, int workspaceId, int currentProjectId, int prevPage) {
    NextResource nextResource = new NextResource();
    nextResource.setPageSize(ISSUE_PAGE_SIZE);

    GitLabLinkParser linkParser = new GitLabLinkParser();
    GitLabLinks links = linkParser.parseLink(linkHeader);

    boolean nextPagePresent = links.getNext() != null && !links.getNext().isEmpty();

    if (nextPagePresent) {
      // Still more issues for same project, get the next page
      nextResource.setProjectId(currentProjectId);
      nextResource.setPageNumber(prevPage + 1);
      return nextResource;
    } else if (isLastProject(workspaceId, currentProjectId)) {
      // On the last project in the workspace and no more issues for it
      nextResource.setProjectId(0);
      nextResource.setPageNumber(0);
      return nextResource;
    } else {
      // No more issues for the project requested.
      // If it's not the last project in the workspace, try and find the next project that has query
      // results
      nextResource =
          findNextProjectWithQueryResults(nextResource, workspaceId, currentProjectId, requestUri);
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
  public NextResource findNextProjectWithQueryResults(
      NextResource nextResource, int workspaceId, int projectId, String uri) {
    ArrayList<Issue> issues;
    boolean emptyResponse = true;

    while (emptyResponse) {
      if (isLastProject(workspaceId, projectId)) {
        return new NextResource();
      }
      projectId = getNextProjectId(workspaceId, projectId);
      uri = getNextProjectIssuesUri(uri, projectId);

      ResponseEntity<ArrayList<Issue>> issuesResponse =
          restTemplate.exchange(
              uri,
              HttpMethod.GET,
              getApplicationJsonHeaders(),
              new ParameterizedTypeReference<>() {});

      issues = issuesResponse.getBody();
      for (var issue : issues) {
        issueService.setStoryPoint(issue);
      }
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
  public boolean isLastProject(int workspaceId, int projectId) {
    ArrayList<Integer> workspaceProjectIds =
        workspaceService.getProjectIdsForWorkspace(workspaceId);
    return workspaceProjectIds.lastIndexOf(projectId) == workspaceProjectIds.size() - 1;
  }

  private HttpEntity<String> getApplicationJsonHeaders() {
    var headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    return new HttpEntity(headers);
  }

  @Override
  public IssuePageResult getPageOfIssues(
      int workspaceId,
      int projectId,
      int page,
      String filter,
      String searchTerm,
      String accessToken) {
    // Initial call for a workspaces issues will pass number 0 for page and project id.
    // SB works out which project it should start from
    page = (page == 0) ? 1 : page;
    projectId =
        (projectId == 0)
            ? workspaceService.getProjectIdsForWorkspace(workspaceId).get(0)
            : projectId;

    String uri =
        String.format(
            "%s/projects?access_token=%s&simple=true&membership=true", gitLabApiUrl, accessToken);
    ResponseEntity<Project[]> userProjectsResponse =
        restTemplate.getForEntity(uri, Project[].class);
    Project[] projects = userProjectsResponse.getBody();

    String queryUri =
        String.format(
            "%s/projects/%d/issues?%s&search=%s&page=%d&access_token=%s",
            gitLabApiUrl,
            projectId,
            issueService.getFilterQuery(filter),
            searchTerm,
            page,
            accessToken);

    ArrayList<Issue> issues;
    IssuePageResult issuePageResult = new IssuePageResult();

    while (true) {
      ResponseEntity<ArrayList<Issue>> issuesResponse =
          restTemplate.exchange(
              queryUri,
              HttpMethod.GET,
              getApplicationJsonHeaders(),
              new ParameterizedTypeReference<>() {});
      var openSprints = sprintService.getSprintsForWorkspace(workspaceId, "active");

      issues = issuesResponse.getBody();
      for (var issue : issues) {
        issueService.setStoryPoint(issue);
        issueService.setStatus(issue);
        issueService.setProjectName(issue, projects);
        sprintService.setSprintForIssue(workspaceId, issue, openSprints);
        if (issue.getAssignee() != null) userService.setProjectId(workspaceId, issue);
      }
      issuePageResult.setIssues(issues);

      if (!issues.isEmpty()) {
        issuePageResult.setNextResource(
            getNextResource(
                queryUri,
                issuesResponse.getHeaders().getFirst("Link"),
                workspaceId,
                projectId,
                page));

        return issuePageResult;
      } else if (isLastProject(workspaceId, projectId)) {
        // If last project and it doesn't have any results for the query, send back 0 values to
        // indicate this to client
        issuePageResult.setNextResource(new NextResource());

        return issuePageResult;
      }
      // Prep next iteration
      projectId = getNextProjectId(workspaceId, projectId);
      page = 1;
      queryUri = getNextProjectIssuesUri(queryUri, projectId);
    }
  }
}
