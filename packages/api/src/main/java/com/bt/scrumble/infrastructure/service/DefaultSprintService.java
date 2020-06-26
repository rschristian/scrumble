package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.MilestoneRestTemplateResponseErrorHandler;
import com.bt.scrumble.application.data.SprintData;
import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.core.sprint.SprintRepository;
import com.bt.scrumble.core.sprint.SprintService;
import com.bt.scrumble.core.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
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
import java.util.List;
import java.util.Map;

@Service
public class DefaultSprintService implements SprintService {

  private final IssueService issueService;
  private final UserService userService;
  private final SprintRepository sprintRepository;
  private final RestTemplate restTemplate;

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired
  public DefaultSprintService(
      IssueService issueService,
      UserService userService,
      SprintRepository sprintRepository,
      RestTemplateBuilder restTemplateBuilder) {
    this.issueService = issueService;
    this.userService = userService;
    this.sprintRepository = sprintRepository;
    this.restTemplate =
        restTemplateBuilder.errorHandler(new MilestoneRestTemplateResponseErrorHandler()).build();
  }

  @Override
  public List<SprintData> getSprintsForWorkspace(int workspaceId, String filter) {
    return sprintRepository.getAllSprintsForWorkspace(workspaceId, filter);
  }

  @Override
  public Issue setSprintForIssue(int workspaceId, Issue issue, List<SprintData> sprints) {
    // Initial assigning of sprint will be milestone data from api. If present, milestone values
    // must be swapped with Scrumble sprint values for future operations. Most importantly, id needs
    // to be changed
    if (issue.getSprint() == null) {
      return issue;
    }

    for (SprintData sprint : sprints) {
      for (Map.Entry<String, Integer> pair : sprint.getProjectIdToMilestoneIds().entrySet()) {
        // Look for a Scrumble sprint that includes the issue's milestone
        if (issue.getSprint().getId() == pair.getValue()) {
          issue.setSprint(sprint);
          return issue;
        }
      }
    }
    return issue;
  }

  @Override
  public ArrayList<Issue> getSprintIssues(int workspaceId, Map<String, Integer> projectIdToMilestoneIds) {
    var allIssues = new ArrayList<Issue>();

    String projectUri = String.format("%s/projects", gitLabApiUrl);
    ResponseEntity<Project[]> userProjectsResponse =
        restTemplate.getForEntity(projectUri, Project[].class);
    Project[] projects = userProjectsResponse.getBody();

    for (Map.Entry<String, Integer> entry : projectIdToMilestoneIds.entrySet()) {
      String projectId = entry.getKey();
      Integer milestoneId = entry.getValue();
      String uri =
          String.format(
              "%s/projects/%s/milestones/%s/issues", gitLabApiUrl, projectId, milestoneId);
      ResponseEntity<ArrayList<Issue>> issueResponse =
          restTemplate.exchange(
              uri,
              HttpMethod.GET,
              getApplicationJsonHeaders(),
              new ParameterizedTypeReference<>() { });
      ArrayList<Issue> issues = issueResponse.getBody();
      if (issues != null) {
        issues.forEach(
            (issue) -> {
              issueService.setStoryPoint(issue);
              issueService.setStatus(issue);
              issueService.setProjectName(issue, projects);
              if (issue.getAssignee() != null) {
                userService.setProjectId(workspaceId, issue);
              }
            });
        allIssues.addAll(issues);
      }
    }
    return allIssues;
  }

  private HttpEntity<String> getApplicationJsonHeaders() {
    var headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    return new HttpEntity<>(headers);
  }
}
