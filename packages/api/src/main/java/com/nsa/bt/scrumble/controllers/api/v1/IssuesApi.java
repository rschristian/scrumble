package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageResult;
import com.nsa.bt.scrumble.services.IIssuePagingService;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IIssueService;
import com.nsa.bt.scrumble.services.IUserService;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

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

    @GetMapping("/workspace/{id}/issues")
    public ResponseEntity<Object> getIssues(
            Authentication auth, @PathVariable(value="id") int id,
            @RequestParam(value="filter") String filter,
            @RequestParam(value="projectId") int projectId,
            @RequestParam(value="page") int page) {

        Optional<String> accessTokenOptional = userService.getToken(((UserPrincipal) auth.getPrincipal()).getId());
        if(accessTokenOptional.isEmpty()) {
            var res = new HashMap<String, String>();
            res.put("message", authErrorMsg);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
        }

        String accessToken = accessTokenOptional.get();
        IssuePageResult issuePageResult = issuePagingService.getPageOfIssues(id, projectId, page, filter, accessToken);

        return ResponseEntity.ok().body(issuePageResult);
    }

    @PostMapping("/workspace/{workspaceId}/project/{projectId}/issue")
    public ResponseEntity<Object> createIssue(
            Authentication authentication, @PathVariable(value="workspaceId") int workspaceId,
            @PathVariable(value="projectId") int projectId,
            @RequestBody Issue issue){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/projects/%2s/issues?title=%3s&description=%4s&labels=%5s&access_token=%6s",
                    gitLabBaseUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(),accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.postForObject(uri, null , String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        var res = new HashMap<String, String>();
        res.put("message", authErrorMsg);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }

    @PutMapping("/workspace/{workspaceId}/project/{projectId}/issue/{issueId}")
    public ResponseEntity<Object> editIssue(
            Authentication authentication,
            @PathVariable(value="workspaceId") int workspaceId,
            @PathVariable(value="projectId") int projectId,
            @PathVariable(value="issueId") int issueId,
            @RequestBody Issue issue) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/projects/%2s/issues/%3s?title=%4s&description=%5s&labels=%6s&access_token=%7s",
                    gitLabBaseUrl, projectId, issue.getIid(), issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), accessTokenOptional.get());
            restTemplate.exchange(uri, HttpMethod.PUT, null, Void.class);
            return ResponseEntity.ok().body("issue updated");
        }
        logger.error("Unable to authenticate with authentication provider");
        var res = new HashMap<String, String>();
        res.put("message", authErrorMsg);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(res);
    }

    @GetMapping("/workspace/{workspaceId}/issues/search")
    public ResponseEntity<Object> searchForIssue(
            Authentication auth,
            @PathVariable(value="workspaceId") int workspaceId,
            @RequestParam(value="filter") String filter,
            @RequestParam(value="searchFor") String searchFor) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            var res = new HashMap<String, ArrayList<Issue>>();
            res.put("issues", issueService.searchForIssue(workspaceId, searchFor, filter, accessTokenOptional.get()));
            return ResponseEntity.ok().body(issueService.searchForIssue(workspaceId, searchFor, filter, accessTokenOptional.get()));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(authErrorMsg);
    }
}
