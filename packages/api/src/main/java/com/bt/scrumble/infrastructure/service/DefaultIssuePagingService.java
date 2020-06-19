package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.issuePaging.IssuePageResult;
import com.bt.scrumble.core.issuePaging.NextResource;
import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.application.data.GitLabLinksData;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.issuePaging.IssuePagingService;
import com.bt.scrumble.core.sprint.SprintService;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class DefaultIssuePagingService implements IssuePagingService {

  private static final int ISSUE_PAGE_SIZE = 20;
  @Autowired
  private RestTemplate restTemplate;

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired
  private WorkspaceService workspaceService;
  @Autowired
  private IssueService issueService;
  @Autowired
  private SprintService sprintService;
  @Autowired
  private UserService userService;

  @Override
  public int getNextProjectId(int workspaceId, int prevProjectId) {
    ArrayList<Integer> workspaceProjectIds =
            workspaceService.getProjectIdsForWorkspace(workspaceId);
    return workspaceProjectIds.get(workspaceProjectIds.lastIndexOf(prevProjectId) + 1);
  }

  private NextResource getNextResource(
          String requestUri, String linkHeader, int workspaceId, int currentProjectId, int prevPage) {
    NextResource nextResource = new NextResource();
    nextResource.setPageSize(ISSUE_PAGE_SIZE);

    GitLabLinksData links = parseLink(linkHeader);

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

  private GitLabLinksData parseLink(String linkHeader) {
    GitLabLinksData gitLabLinks = new GitLabLinksData();
    String[] links = linkHeader.split(",");
    for (String link : links) {
      String[] segments = link.split(";");
      if (segments.length < 2) {
        continue;
      }

      String linkPart = segments[0].trim();
      if (!linkPart.startsWith("<") || !linkPart.endsWith(">")) {
        continue;
      }
      linkPart = linkPart.substring(1, linkPart.length() - 1);
      linkPart = linkPart.replaceAll("http://10.72.98.102", "https://gitlab.ryanchristian.dev");

      for (int i = 1; i < segments.length; i++) {
        String[] rel = segments[i].trim().split("="); // $NON-NLS-1$
        if (rel.length < 2 || !"rel".equals(rel[0])) {
          continue;
        }

        String relValue = rel[1];
        if (relValue.startsWith("\"") && relValue.endsWith("\"")) { // $NON-NLS-1$ //$NON-NLS-2$
          relValue = relValue.substring(1, relValue.length() - 1);
        }

        switch (relValue) {
          case "next":
            gitLabLinks.setNext(linkPart);
            break;
          case "last":
            gitLabLinks.setLast(linkPart);
            break;
          case "first":
            gitLabLinks.setFirst(linkPart);
            break;
          case "prev":
            gitLabLinks.setPrev(linkPart);
            break;
          default:
            break;
        }
      }
    }
    return gitLabLinks;
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
              new ParameterizedTypeReference<>() { });

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
              new ParameterizedTypeReference<>() { });
      var openSprints = sprintService.getSprintsForWorkspace(workspaceId, "active");

      issues = issuesResponse.getBody();
      for (var issue : issues) {
        issueService.setStoryPoint(issue);
        issueService.setStatus(issue);
        issueService.setProjectName(issue, projects);
        sprintService.setSprintForIssue(workspaceId, issue, openSprints);
        if (issue.getAssignee() != null) {
          userService.setProjectId(workspaceId, issue);
        }
      }
      issuePageResult.appendIssues(issues);

      if (!issues.isEmpty() && issuePageResult.getIssues().size() >= 20) {
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
