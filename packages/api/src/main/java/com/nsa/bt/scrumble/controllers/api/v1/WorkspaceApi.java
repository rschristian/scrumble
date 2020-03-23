package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageResult;
import com.nsa.bt.scrumble.dto.NextResource;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IIssuePagingService;
import com.nsa.bt.scrumble.services.IIssueService;
import com.nsa.bt.scrumble.services.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/workspace")
public class WorkspaceApi {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceApi.class);

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    IUserService userService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IIssueService issueService;

    @Autowired
    IIssuePagingService issuePagingService;

    @GetMapping("/{id}/issues")
    public ResponseEntity<Object> getIssues(
            Authentication auth, @PathVariable(value="id") int id,
            @RequestParam(value="filter") String filter,
            @RequestParam(value="projectId") int projectId,
            @RequestParam(value="page") int page) {

        page = issuePagingService.getPageNumber(page);
        projectId = issuePagingService.getProjectId(id, projectId);

        ArrayList<Issue> issues = new ArrayList<>();
        NextResource nextResource = new NextResource();
        nextResource.setPageSize(20);

        IssuePageResult issuePageResult = new IssuePageResult();

        Optional<String> accessTokenOptional = userService.getToken(((UserPrincipal) auth.getPrincipal()).getId());
        if(accessTokenOptional.isEmpty()) {
            return ResponseEntity.ok().body("Something went wrong...");
        }

        boolean issuesEmpty = true;
        String accessToken = accessTokenOptional.get();

        while (issuesEmpty) {
            String uri = String.format("%s/projects/%d/issues?%s&page=%d&access_token=%s",
                    gitLabApiUrl, projectId, issuePagingService.getFilterQuery(filter), page, accessToken);

            ResponseEntity<ArrayList<Issue>> issuesResponse = getIssuesResponse(uri);

            issues = issuesResponse.getBody();

            if (issues.isEmpty()) {
                // If no issues for project and is last project, exit loop
                if (issuePagingService.isLastProject(id, projectId)) {
                    logger.info("Last project and no more issues");
                } else {
                    // If not last project, search for next project with filter results
                    issuePageResult = issuePagingService.getNextPageOfIssues(id, projectId, uri);
                    if(issues.isEmpty()) {
                        projectId = 0;
                    } else {
                        projectId = issues.get(0).getProjectId();
                    }
                }
            } else {
                issuePageResult.setIssues(issues);
                issuePageResult.setNextResource(issuePagingService.getNextResource(uri, issuesResponse.getHeaders().getFirst("Link"), id, projectId, page));
            }
            issuesEmpty = false;
        }

        issueService.filterAndSetStoryPoint(issues);

        return ResponseEntity.ok().body(issuePageResult);
    }

    private ResponseEntity<ArrayList<Issue>> getIssuesResponse(String uri) {
        return restTemplate.exchange(
                uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
    }

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }
}
