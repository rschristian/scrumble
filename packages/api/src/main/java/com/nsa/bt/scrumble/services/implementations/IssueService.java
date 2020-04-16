package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.regression.LinearRegression;
import com.nsa.bt.scrumble.services.IIssueService;

import com.nsa.bt.scrumble.services.ISprintService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.nsa.bt.scrumble.repositories.IIssueRepository;

import java.util.*;

@Service
public class IssueService implements IIssueService {

    private static final Logger logger = LoggerFactory.getLogger(IssueService.class);

    private static final String UNPLANNED = "unplanned";
    private static final String OPENED = "opened";
    private static final String CLOSED = "closed";

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    WorkspaceService workspaceService;

    @Autowired
    ISprintService sprintService;

    @Autowired
    LinearRegression linearRegression;

    @Autowired
    IIssueRepository issueRepository;

    @Override
    public void setStoryPoint(Issue issue) {
        OptionalInt storyPoint =issue.getLabels()
                .stream()
                .filter(IssueService::isInteger)
                .mapToInt(Integer::parseInt)
                .findFirst();

        if(storyPoint.isPresent()) {
            issue.setStoryPoint(storyPoint.getAsInt());
        }
    }

    @Override
    public void filterAndSetStoryPoint(ArrayList<Issue> issues) {
        issues.forEach(this::setStoryPoint);
    }

    // Ref: https://stackoverflow.com/a/5439547/11679751
    public static boolean isInteger(String s) {
        return isInteger(s,10);
    }

    public static boolean isInteger(String s, int radix) {
        if(s.isEmpty()) return false;
        for(int i = 0; i < s.length(); i++) {
            if(i == 0 && s.charAt(i) == '-') {
                if(s.length() == 1) return false;
                else continue;
            }
            if(Character.digit(s.charAt(i),radix) < 0) return false;
        }
        return true;
    }

    @Override
    public  ArrayList<Issue> searchForIssue(int workspaceId, String searchFor, String filter, String accessToken) {
        var issues = new ArrayList<Issue>();
        ArrayList<Integer> projectIds = workspaceService.getProjectIdsForWorkspace(workspaceId);
        String uri;

        for(int projectId : projectIds) {
            uri = String.format("%s/projects/%d/issues?%s&search=%s&access_token=%s",
                    gitLabApiUrl, projectId, getFilterQuery(filter), searchFor, accessToken);

            ResponseEntity<ArrayList<Issue>> issuesResponse =  restTemplate.exchange(uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
            var matchingIssues = issuesResponse.getBody();
            filterAndSetStoryPoint(issues);
            if(!matchingIssues.isEmpty()) {
                issues.addAll(matchingIssues);
            }
        }
        return issues;
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

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }

    @Override
    public void setProjectName(Issue issue, Project[] projects) {
        for(int i = 0; i< projects.length; i++) {
            if(issue.getProjectId() == projects[i].getId()) {
                issue.setProjectName(projects[i].getName());
                return;
            }
        }
    }

    @Override
    public void setStatus(Issue issue) {
        if(issue.getLabels().contains("opened")) {
            issue.setStatus("opened");
        } else if (issue.getLabels().contains("To Do")){
            issue.setStatus("To Do");
        } else if (issue.getLabels().contains("Doing")){
            issue.setStatus("Doing");
        } else if(issue.getLabels().contains("closed")) {
            issue.setStatus("closed");
        } else {
            issue.setStatus("opened");
        }
    }

    @Override
    public Issue createIssue(int workspaceId, int projectId,  Issue issue, String accessToken) {
        String issueUri = getIssueUri(workspaceId, projectId, issue, accessToken);
        String projectUri = String.format("%s/projects?access_token=%s&simple=true&membership=true",
                gitLabApiUrl, accessToken);
        ResponseEntity<Project[]> userProjectsResponse = restTemplate.getForEntity(projectUri, Project[].class);
        Project[] projects = userProjectsResponse.getBody();
        Issue newIssue = restTemplate.postForObject(issueUri, null , Issue.class);
        setStoryPoint(newIssue);
        setProjectName(newIssue, projects);
        linearRegression.setEstimate(projectId, newIssue, accessToken);
        return newIssue;
    }

    @Override
    public Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken) {
        String uri;
        if(issue.getSprint() != null) {
            int milestoneId = sprintService.getMilestoneId(workspaceId, projectId, issue.getSprint().getId());
            if(issue.getSprint().getId() == 0) { //No Sprint selected
                issueRepository.removeIssue(issue.getIid());
            } else { // adds start time 
                issueRepository.updateStartDate(issue.getIid());
            }
            uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s,%s&assignee_ids[]=%s&milestone_id=%d&access_token=%s",
                    gitLabApiUrl,projectId,issue.getIid(),issue.getTitle(),issue.getDescription(),issue.getStoryPoint(),issue.getStatus(),issue.getAssignee().getId(), milestoneId, accessToken);
        } else {
            if(issue.getStatus().equals("closed")){
                issueRepository.updateDueDate(issue.getIid());
                int timeSpent = issueRepository.calculateTime(issue.getIid());
                issue.setTimeSpent(timeSpent);
                uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s,%s&assignee_ids[]=%s&state_event=close&access_token=%s",
                    gitLabApiUrl,projectId,issue.getIid(),issue.getTitle(),issue.getDescription(),issue.getStoryPoint(),issue.getStatus(),issue.getAssignee().getId(), accessToken);
            } else {
                issueRepository.removeDueDate(issue.getIid());
                uri = String.format("%s/projects/%s/issues/%s?title=%s&description=%s&labels=%s,%s&assignee_ids[]=%s&state_event=reopen&access_token=%s",
                    gitLabApiUrl,projectId,issue.getIid(),issue.getTitle(),issue.getDescription(),issue.getStoryPoint(),issue.getStatus(),issue.getAssignee().getId(), accessToken);
            }
        }
        restTemplate.exchange(uri, HttpMethod.PUT, null, Void.class);
        if(issue.getStatus().equals("closed")){
            linearRegression.setTimeSpent(projectId, issue, accessToken);
        } else {
            linearRegression.setEstimate(projectId, issue, accessToken);
        }
        return issue;
    }

    private String getIssueUri(int workspaceId, int projectId, Issue issue, String accessToken) {
        if (issue.getSprint()!= null) {
            int milestoneId = sprintService.getMilestoneId(workspaceId, projectId, issue.getSprint().getId());
            return String.format("%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&milestone_id=%d&access_token=%s",
                    gitLabApiUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), issue.getAssignee().getId(), milestoneId, accessToken);
        } else {
            return String.format("%s/projects/%s/issues?title=%s&description=%s&labels=%s&assignee_ids[]=%s&access_token=%s",
                    gitLabApiUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), issue.getAssignee().getId(), accessToken);
        }
    }
}
