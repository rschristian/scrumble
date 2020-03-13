package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.implementations.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RequestMapping("/api/v1/workspace")
public class WorkspaceApi {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceApi.class);

    @Autowired
    UserService userService;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getWorkspace(@PathVariable(value="id") int id) {
        Issue issue = new Issue(id, "An issue name", "An issue description", 8, "Phoenix Project");

        return ResponseEntity.ok().body(issue);
    }

    @GetMapping("/issues")
    public ResponseEntity<Object> getIssues(Authentication auth) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("http://10.72.98.102/api/v4/projects/4/issues?access_token=%s", accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.getForObject(uri, String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }
}
