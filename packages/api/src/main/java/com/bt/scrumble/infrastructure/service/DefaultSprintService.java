package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.dto.Issue;
import com.bt.scrumble.application.dto.Project;
import com.bt.scrumble.application.models.Sprint;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.sprint.SprintRepository;
import com.bt.scrumble.core.sprint.SprintService;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.bt.scrumble.errorhandlers.MilestoneRestTemplateResponseErrorHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DefaultSprintService implements SprintService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultSprintService.class);
    private final RestTemplate restTemplate;
    @Autowired
    IssueService issueService;
    @Autowired
    UserService userService;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    private SprintRepository sprintRepository;
    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    public DefaultSprintService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate =
                restTemplateBuilder.errorHandler(new MilestoneRestTemplateResponseErrorHandler()).build();
    }

    @Override
    public Sprint createSprint(int workspaceId, Sprint sprint, String accessToken) {
        var projectMilestoneIds = new HashMap<String, Integer>();
    ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId);

    for (int projectId : projectIds) {
      String uri =
          String.format(
              "%s/projects/%d/milestones?title=%s&description=%s&start_date=%tF&due_date=%tF&access_token=%s",
              gitLabApiUrl,
              projectId,
              sprint.getTitle(),
              sprint.getDescription(),
              sprint.getStartDate(),
              sprint.getDueDate(),
              accessToken);
      Sprint milestone = restTemplate.postForObject(uri, null, Sprint.class);
      projectMilestoneIds.put(Integer.toString(projectId), milestone.getId());
    }
    sprint.setProjectIdToMilestoneIds(projectMilestoneIds);
    sprint = sprintRepository.createSprint(workspaceId, sprint);

    return sprint;
  }

  @Override
  public Sprint editSprint(int workspaceId, Sprint sprint, String accessToken) {
    for (Map.Entry<String, Integer> pair
        : sprintRepository.getProjectIdsToMilestoneIds(sprint.getId()).entrySet()) {
      editGitLabMilestone(Integer.parseInt(pair.getKey()), pair.getValue(), sprint, accessToken);
    }
    sprint = sprintRepository.editSprint(workspaceId, sprint);

    return sprint;
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

  private void editGitLabMilestone(
      int projectId, int milestoneId, Sprint sprint, String accessToken) {
    String stateEvent = (sprint.getStatus().equalsIgnoreCase("active"))
        ? "activate"
        : "close";
    String uri =
        String.format(
            "%s/projects/%d/milestones/%d?title=%s&description=%s&start_date=%tF&due_date=%tF&state_event=%s&access_token=%s",
            gitLabApiUrl,
            projectId,
            milestoneId,
            sprint.getTitle(),
            sprint.getDescription(),
            sprint.getStartDate(),
            sprint.getDueDate(),
            stateEvent,
            accessToken);
    restTemplate.exchange(uri, HttpMethod.PUT, null, String.class);
  }

  @Override
  public ArrayList<Issue> getSprintIssues(int workspaceId, Sprint sprint, String accessToken) {
    ArrayList<Issue> allIssues = new ArrayList();

    String projectUri =
        String.format(
            "%s/projects?access_token=%s&simple=true&membership=true", gitLabApiUrl, accessToken);
    ResponseEntity<Project[]> userProjectsResponse =
        restTemplate.getForEntity(projectUri, Project[].class);
    Project[] projects = userProjectsResponse.getBody();

    for (Map.Entry<String, Integer> entry : sprint.getProjectIdToMilestoneIds().entrySet()) {
      String projectId = entry.getKey();
      Integer milestoneId = entry.getValue();
      String uri =
          String.format(
              "%s/projects/%s/milestones/%s/issues?access_token=%s",
              gitLabApiUrl, projectId, milestoneId, accessToken);
      ResponseEntity<ArrayList<Issue>> issueResponse =
          restTemplate.exchange(
              uri,
              HttpMethod.GET,
              getApplicationJsonHeaders(),
              new ParameterizedTypeReference<>() { });
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
