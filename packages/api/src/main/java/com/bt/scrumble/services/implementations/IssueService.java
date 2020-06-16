package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.dto.Project;
import com.bt.scrumble.regression.LinearRegression;
import com.bt.scrumble.repositories.IIssueRepository;
import com.bt.scrumble.services.IIssueService;
import com.bt.scrumble.services.ISprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.OptionalInt;

@Service
public class IssueService implements IIssueService {

    private static final String UNPLANNED = "unplanned";
    private static final String OPENED = "opened";
    private static final String CLOSED = "closed";

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ISprintService sprintService;

    @Autowired
    private LinearRegression linearRegression;

    @Autowired
    private IIssueRepository issueRepository;

    // Ref: https://stackoverflow.com/a/5439547/11679751
    public static boolean isInteger(String s) {
        return isInteger(s, 10);
    }

    public static boolean isInteger(String s, int radix) {
        if (s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            if (i == 0 && s.charAt(i) == '-') {
                if (s.length() == 1) return false;
                else continue;
            }
            if (Character.digit(s.charAt(i), radix) < 0) return false;
        }
        return true;
    }

    @Override
    public void setStoryPoint(Issue issue) {
        OptionalInt storyPoint = issue.getLabels()
                .stream()
                .filter(IssueService::isInteger)
                .mapToInt(Integer::parseInt)
                .findFirst();

        if (storyPoint.isPresent()) issue.setStoryPoint(storyPoint.getAsInt());

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
    public void setProjectName(Issue issue, Project[] projects) {
        for (Project project : projects) {
            if (issue.getProjectId() == project.getId()) {
                issue.setProjectName(project.getName());
                return;
            }
        }

    }

    @Override
    public void setStatus(Issue issue) {
        if (issue.getLabels().contains("opened")) {
            issue.setStatus("opened");
        } else if (issue.getLabels().contains("To Do")) {
            issue.setStatus("To Do");
        } else if (issue.getLabels().contains("Doing")) {
            issue.setStatus("Doing");
        } else if (issue.getLabels().contains("closed")) {
            issue.setStatus("closed");
        } else {
            issue.setStatus("opened");
        }
    }

    @Override
    public Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken) {
        String issueUri = getIssueUri(workspaceId, projectId, issue, accessToken);
        String projectUri = String.format("%s/projects?access_token=%s&simple=true&membership=true",
                gitLabApiUrl, accessToken);
        ResponseEntity<Project[]> userProjectsResponse = restTemplate.getForEntity(projectUri, Project[].class);
        Project[] projects = userProjectsResponse.getBody();
        Issue newIssue = restTemplate.postForObject(issueUri, null, Issue.class);
        setStoryPoint(newIssue);
        setProjectName(newIssue, projects);
        linearRegression.setEstimate(projectId, newIssue, accessToken);
        return newIssue;
    }

    @Override
    public Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken) {
        String uri;

        if (issue.getSprint() != null) {
            int milestoneId = sprintService.getMilestoneId(workspaceId, projectId, issue.getSprint().getId());
            if (issue.getSprint().getId() == 0) { //No Sprint selected
                issueRepository.removeIssue(issue.getIid(), projectId);
            } else { // adds start time
                issueRepository.updateStartTime(issue.getIid(), projectId);
            }
            uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s&assignee_ids[]=%s&milestone_id=%d&access_token=%s",
                    gitLabApiUrl, projectId, issue.getIid(), issue.getTitle(), issue.getDescription(),
                    issue.getStoryPoint(), issue.getAssignee().getId(), milestoneId, accessToken);
        } else {
            if (issue.getStatus().equals("closed")) {
                issueRepository.updateEndTime(issue.getIid(), projectId);
                int timeSpent = issueRepository.calculateTime(issue.getIid(), projectId);
                issue.setTimeSpent(timeSpent);
                uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s&assignee_ids[]=%s&access_token=%s",
                        gitLabApiUrl, projectId, issue.getIid(), issue.getTitle(), issue.getDescription(),
                        issue.getStoryPoint(), issue.getAssignee().getId(), accessToken);
            } else {
                issueRepository.removeEndTime(issue.getIid(), projectId);
                uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s,%s&assignee_ids[]=%s&state_event=reopen&access_token=%s",
                        gitLabApiUrl, projectId, issue.getIid(), issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), issue.getStatus(), issue.getAssignee().getId(), accessToken);
            }
        }

        restTemplate.exchange(uri, HttpMethod.PUT, null, Void.class);
        if (issue.getStatus().equals("closed")) {
            linearRegression.setTimeSpent(projectId, issue, accessToken);
        } else {
            linearRegression.setEstimate(projectId, issue, accessToken);
        }

        return issue;
    }

    private String getIssueUri(int workspaceId, int projectId, Issue issue, String accessToken) {
        if (issue.getSprint() != null) {
            int milestoneId = sprintService.getMilestoneId(workspaceId, projectId, issue.getSprint().getId());

            return String.format("%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&milestone_id=%d&access_token=%s",
                    gitLabApiUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), issue.getAssignee().getId(), milestoneId, accessToken);
        } else {

            return String.format("%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&access_token=%s",
                    gitLabApiUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), issue.getAssignee().getId(), accessToken);
        }
    }
}
