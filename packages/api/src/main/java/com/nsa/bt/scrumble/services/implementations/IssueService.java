package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.services.IIssueService;

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
import java.util.OptionalInt;


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
    public  ArrayList<Issue> searchForIssue(int workspaceId, String searchFor, String filter,  String accessToken) {
        var issues = new ArrayList<Issue>();
        int[] projectIds = workspaceService.getProjectIdsForWorkspace(workspaceId);
        String uri;

        for(int projectId : projectIds) {
            logger.info(String.format("On project id: %d", projectId));
            uri = String.format("%s/projects/%d/issues?%s&search=%s&access_token=%s",
                    gitLabApiUrl, projectId, getFilterQuery(filter), searchFor, accessToken);

            ResponseEntity<ArrayList<Issue>> issuesResponse =  restTemplate.exchange(uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
            var matchingIssues = issuesResponse.getBody();
            if(!matchingIssues.isEmpty()) {
                issues.addAll(matchingIssues);
            }
        }

        for(Issue issue: issues) {
            logger.info(issue.getTitle());
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
}
