package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.regression.LinearRegression;
import com.nsa.bt.scrumble.regression.DataGrabber;
import com.nsa.bt.scrumble.dto.IssuePageResult;
import com.nsa.bt.scrumble.services.IIssuePagingService;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IIssueService;
import com.nsa.bt.scrumble.services.IUserService;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import io.opentracing.Span;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.core.ParameterizedTypeReference;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("/api/v1")
public class IssuesApi {

    private static final Logger logger = LoggerFactory.getLogger(IssuesApi.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IUserService userService;

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;


    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabBaseUrl;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    @Autowired
    IIssuePagingService issuePagingService;

    @Autowired
    IIssueService issueService;

    @Autowired
    IWorkspaceService workspaceService;

    @Autowired
    DataGrabber dataGrabber;

    @GetMapping("/workspace/{id}/issues")
    public ResponseEntity<Object> getIssues(
        Authentication auth,
        @PathVariable(value="id") int workspaceId,
        @RequestParam(value="projectId") int projectId,
        @RequestParam(value="page") int page,
        @RequestParam(value="filter") String filter,
        @RequestParam(value="searchFor") String searchTerm
    ) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /workspace/" + workspaceId + "/issues").start();
        Optional<String> accessTokenOptional = userService.getToken(((UserPrincipal) auth.getPrincipal()).getId());
        if(accessTokenOptional.isEmpty()) {
            var res = new HashMap<String, String>();
            res.put("message", authErrorMsg);
            span.finish();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
        }

        if (workspaceService.getProjectIdsForWorkspace(workspaceId).isEmpty()) {
            span.finish();
            return ResponseEntity.ok().body("You haven't added any projects to your workspace!");
        }

        String accessToken = accessTokenOptional.get();
        IssuePageResult issuePageResult = issuePagingService.getPageOfIssues(workspaceId, projectId, page, filter, searchTerm, accessToken);

        span.finish();
        return ResponseEntity.ok().body(issuePageResult);
    }

    @PostMapping("/workspace/{workspaceId}/project/{projectId}/issue")
    public ResponseEntity<Object> createIssue(
            Authentication authentication,
            @PathVariable(value="workspaceId") int workspaceId,
            @PathVariable(value="projectId") int projectId,
            @RequestBody Issue issue) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP POST /workspace/" + workspaceId + "/projects/" + projectId + "/issues").start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(!issue.getAssignee().getProjectIds().contains(projectId)) {
            logger.error("User does not exist on this project");
            var res = new HashMap<String, String>();
            res.put("message", "User does not exist on this project");
            span.finish();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
        }
        if(accessTokenOptional.isPresent()) {
            span.finish();
            return ResponseEntity.ok().body(issueService.createIssue(workspaceId, projectId, issue, accessTokenOptional.get()));
        }
        logger.error("Unable to authenticate with authentication provider");
        var res = new HashMap<String, String>();
        res.put("message", authErrorMsg);

        span.finish();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }

    @PutMapping("/workspace/{workspaceId}/project/{projectId}/issue/{issueId}")
    public ResponseEntity<Object> editIssue(
            Authentication authentication,
            @PathVariable(value="workspaceId") int workspaceId,
            @PathVariable(value="projectId") int projectId,
            @PathVariable(value="issueId") int issueId,
            @RequestBody Issue issue) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP PUT /workspace/" + workspaceId + "/projects/" + projectId + "/issue/" + issueId).start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(!issue.getAssignee().getProjectIds().contains(projectId)) {
            logger.error("User does not exist on this project");
            var res = new HashMap<String, String>();
            res.put("message", "User does not exist on this project");
            span.finish();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
        }
        if(accessTokenOptional.isPresent()) {
            span.finish();
            return ResponseEntity.ok().body(issueService.editIssue(workspaceId, projectId, issue, accessTokenOptional.get()));
        }
        logger.error("Unable to authenticate with authentication provider");
        var res = new HashMap<String, String>();
        res.put("message", authErrorMsg);

        span.finish();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }
}
