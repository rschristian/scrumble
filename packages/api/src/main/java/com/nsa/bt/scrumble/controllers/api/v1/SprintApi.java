package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.ISprintService;
import com.nsa.bt.scrumble.services.IUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class SprintApi {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IUserService userService;

    @Autowired
    ISprintService sprintService;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabBaseUrl;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    private static final Logger logger = LoggerFactory.getLogger(ProjectApi.class);

    @PostMapping("/workspace/{workspaceId}/sprint")
    public ResponseEntity<Object> createSprint(
            Authentication auth,
            @PathVariable(value="workspaceId") int workspaceId,
            @RequestBody Sprint sprint) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
//            return ResponseEntity.ok().body(sprintService.createSprint(workspaceId, sprint, accessTokenOptional.get()));
            return ResponseEntity.ok().body(sprint);
        }
        return ResponseEntity.ok().body(authErrorMsg);
    }

    @PutMapping("/workspace/{workspaceId}/sprint")
    public ResponseEntity<Object> editSprint(
            Authentication auth,
            @PathVariable(value="workspaceId") int workspaceId,
            @RequestBody Sprint sprint) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            return ResponseEntity.ok().body(sprintService.editSprint(workspaceId, sprint, accessTokenOptional.get()));
        }
        return ResponseEntity.ok().body(authErrorMsg);
    }

    @GetMapping("/workspace/{workspaceId}/sprints")
    public ResponseEntity<Object> getWorkspaceSprints(
            Authentication auth,
            @PathVariable(value="workspaceId") int workspaceId) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            return ResponseEntity.ok().body(sprintService.getAllSprintsForWorkspace(workspaceId));
        }
        return ResponseEntity.ok().body(authErrorMsg);
    }
}
