package com.bt.scrumble.api.v1;

import com.bt.scrumble.api.v1.security.UserPrincipal;
import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.application.data.WorkspaceData;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class WorkspaceApi {

  @Autowired
  private WorkspaceService workspaceService;

  @Autowired
  private UserService userService;

  @Value("${app.msg.error.auth}")
  private String authErrorMsg;

  @GetMapping("/workspaces")
  public ResponseEntity<Object> getAllWorkspaces() {
    return ResponseEntity.ok().body(workspaceService.getAllWorkspaces());
  }

  @GetMapping("/workspace/{id}/projects")
  public ResponseEntity<Object> getWorkspaceProjects(
      Authentication authentication, @PathVariable(value = "id") int workspaceId) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
    return accessTokenOptional
        .<ResponseEntity<Object>>map(
            s -> ResponseEntity.ok().body(workspaceService.getWorkspaceProjects(workspaceId, s)))
        .orElseGet(
            () ->
                ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", authErrorMsg)));
  }

  @PostMapping("/workspace")
  public ResponseEntity<Object> createWorkspace(
      Authentication authentication, @RequestBody WorkspaceData workspace) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
    if (accessTokenOptional.isPresent()) {
      workspaceService.setWorkspaceUsers(workspace, accessTokenOptional);
      return ResponseEntity.status(HttpStatus.CREATED)
          .body(
              workspaceService.createWorkspace(
                  workspace,
                  new UserData(
                      userPrincipal.getId(),
                      userPrincipal.getServiceId(),
                      userPrincipal.getProviderId())));
    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg));
  }

  @PutMapping("/workspace/{id}")
  public ResponseEntity<Object> editWorkspace(
      Authentication authentication, @RequestBody WorkspaceData workspace) {
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
