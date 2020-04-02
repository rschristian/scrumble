package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;
import com.nsa.bt.scrumble.services.IWorkspaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class WorkspaceApi {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceApi.class);

    @Autowired
    IWorkspaceService workspaceService;

    @Autowired
    IUserService userService;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    @GetMapping("/workspaces")
    public ResponseEntity<Object> getAllWorkspaces(){
        return ResponseEntity.ok().body(workspaceService.getAllWorkspaces());
    }

    @PostMapping("/workspace")
    public ResponseEntity<Object> createWorkspace(Authentication authentication, @RequestBody Workspace workspace){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.createWorkspace(
                    workspace,
                    new User(userPrincipal.getId(), userPrincipal.getServiceId(), userPrincipal.getProviderId())
            ));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authErrorMsg);
    }

    @PutMapping("/workspace/{id}")
    public ResponseEntity<Object> editWorkspace(Authentication authentication, @RequestBody Workspace workspace){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            workspaceService.editWorkspace(workspace);
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(authErrorMsg);
    }
}