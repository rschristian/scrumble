package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.Project;
import com.bt.scrumble.errorhandlers.MilestoneRestTemplateResponseErrorHandler;
import com.bt.scrumble.models.Sprint;
import com.bt.scrumble.repositories.ISprintRepository;
import com.bt.scrumble.services.IIssueService;
import com.bt.scrumble.services.ISprintService;
import com.bt.scrumble.services.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class SprintService implements ISprintService {

  private static final Logger LOGGER = LoggerFactory.getLogger(SprintService.class);
  private final IIssueService issueService;
  private final IUserService userService;
  private final ISprintRepository sprintRepository;
  private final RestTemplate restTemplate;
  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired
  public SprintService(
      IIssueService issueService,
      IUserService userService,
      ISprintRepository sprintRepository,
      RestTemplateBuilder restTemplateBuilder) {
    this.issueService = issueService;
    this.userService = userService;
    this.sprintRepository = sprintRepository;
    this.restTemplate =
        restTemplateBuilder.errorHandler(new MilestoneRestTemplateResponseErrorHandler()).build();
  }

  @Override
  public List<Sprint> getSprintsForWorkspace(int workspaceId, String filter) {
    return sprintRepository.getAllSprintsForWorkspace(workspaceId, filter);
  }

  @Override
  public Issue setSprintForIssue(int workspaceId, Issue issue, List<Sprint> sprints) {
    // Initial assigning of sprint will be milestone data from api. If present, milestone values
    // must be swapped with Scrumble sprint values for future operations. Most importantly, id needs
    // to be changed
    if (issue.getSprint() == null) {
      return issue;
    }

    for (Sprint sprint : sprints) {
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
  public int getMilestoneId(int workspaceId, int projectId, int sprintId) {
    if (sprintId == 0) {
      return sprintId;
    }
    Sprint sprint = sprintRepository.getSprintById(sprintId);

    try {
      return sprint.getProjectIdToMilestoneIds().get(Integer.toString(projectId));
    } catch (NullPointerException e) {
      LOGGER.error(
          String.format(
              "Project with id %d does not have a corresponding milestone for sprint with id %d",
              projectId, sprintId));
    }
    return 0;
  }

  @Override
  public ArrayList<Issue> getSprintIssues(int workspaceId, Sprint sprint) {
    ArrayList<Issue> allIssues = new ArrayList();

    String projectUri = String.format("%s/projects", gitLabApiUrl);
    ResponseEntity<Project[]> userProjectsResponse =
        restTemplate.getForEntity(projectUri, Project[].class);
    Project[] projects = userProjectsResponse.getBody();

    for (Map.Entry<String, Integer> entry : sprint.getProjectIdToMilestoneIds().entrySet()) {
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
              new ParameterizedTypeReference<>() {});
      ArrayList<Issue> issues = issueResponse.getBody();
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
    return allIssues;
  }

  private HttpEntity<String> getApplicationJsonHeaders() {
    var headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    return new HttpEntity(headers);
  }
}
