package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageData;
import com.nsa.bt.scrumble.security.UserPrincipal;
//import com.nsa.bt.scrumble.services.ICacheService;
import com.nsa.bt.scrumble.services.IIssueService;
import com.nsa.bt.scrumble.services.IUserService;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

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

//    @Autowired
//    ICacheService cacheService;

    @GetMapping("/{id}/issues")
    public ResponseEntity<Object> getIssues(Authentication auth, @PathVariable(value="id") int id, @RequestParam(value="page") String page) {
        int[] projectIds = { 1, 5, 3, 4, 8 };
        int pageNum = Integer.parseInt(page.replace("/", ""));

        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

        if(accessTokenOptional.isPresent()) {
            return ResponseEntity.ok().body(issueService.getIssuesPage(id, projectIds, accessTokenOptional.get(), pageNum));
        }

        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }
}
