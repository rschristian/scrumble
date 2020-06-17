package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.models.User;
import com.bt.scrumble.models.Workspace;
import com.bt.scrumble.security.UserPrincipal;
import com.bt.scrumble.services.IUserService;
import com.bt.scrumble.services.IWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class WorkspaceApi {

    @Autowired
    private IWorkspaceService workspaceService;

    @Autowired
    private IUserService userService;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    @GetMapping("/workspaces")
    public ResponseEntity<Object> getAllWorkspaces() {
        return ResponseEntity.ok().body(workspaceService.getAllWorkspaces());
    }

    @GetMapping("/workspace/{id}/projects")
    public ResponseEntity<Object> getWorkspaceProjects(Authentication authentication, @PathVariable(value = "id") int workspaceId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        return accessTokenOptional.<ResponseEntity<Object>>map(s ->
                ResponseEntity.ok().body(workspaceService.getWorkspaceProjects(workspaceId, s))).orElseGet(() ->
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg))
        );
    }

    @PostMapping("/workspace")
    public ResponseEntity<Object> createWorkspace(Authentication authentication, @RequestBody Workspace workspace) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if (accessTokenOptional.isPresent()) {
            workspaceService.setWorkspaceUsers(workspace, accessTokenOptional);
            return ResponseEntity.status(HttpStatus.CREATED).body(workspaceService.createWorkspace(
                    workspace,
                    new User(userPrincipal.getId(), userPrincipal.getServiceId(), userPrincipal.getProviderId())
            ));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg));
    }

    @PutMapping("/workspace/{id}")
    public ResponseEntity<Object> editWorkspace(Authentication authentication, @RequestBody Workspace workspace) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if (accessTokenOptional.isPresent()) {
            workspaceService.setWorkspaceUsers(workspace, accessTokenOptional);
            workspaceService.editWorkspace(workspace);
            return ResponseEntity.ok().body(workspace);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg));
    }
}
