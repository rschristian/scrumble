package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;
import com.nsa.bt.scrumble.services.IWorkspaceService;

import io.opentracing.Span;
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
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /workspaces").start();
        var workspaces = workspaceService.getAllWorkspaces(span);
        span.finish();
        return ResponseEntity.ok().body(workspaces);
    }

    @GetMapping("/workspace/{id}/projects")
    public ResponseEntity<Object> getWorkspaceProjects(Authentication authentication, @PathVariable(value = "id") int workspaceId) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /workspace/" + workspaceId + "/projects").start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId(), span);
        var projects = accessTokenOptional.<ResponseEntity<Object>>map(s ->
                ResponseEntity.ok().body(workspaceService.getWorkspaceProjects(workspaceId, s, span))).orElseGet(() ->
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg))
        );
        span.finish();
        return projects;
    }

    @PostMapping("/workspace")
    public ResponseEntity<Object> createWorkspace(Authentication authentication, @RequestBody Workspace workspace) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP POST /workspace").start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId(), span);
        if (accessTokenOptional.isPresent()) {
            workspaceService.setWorkspaceUsers(workspace, accessTokenOptional, span);
            workspace = workspaceService.createWorkspace(
                    workspace,
                    new User(userPrincipal.getId(), userPrincipal.getServiceId(), userPrincipal.getProviderId()),
                    span
            );
            span.finish();
            return ResponseEntity.status(HttpStatus.CREATED).body(workspace);
        }
        span.finish();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg));
    }

    @PutMapping("/workspace/{id}")
    public ResponseEntity<Object> editWorkspace(Authentication authentication, @RequestBody Workspace workspace) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP PUT /workspace/" + workspace.getId()).start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId(), span);
        if (accessTokenOptional.isPresent()) {
            workspaceService.setWorkspaceUsers(workspace, accessTokenOptional, span);
            workspaceService.editWorkspace(workspace, span);
            span.finish();
            return ResponseEntity.ok().body(workspace);
        }
        span.finish();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", authErrorMsg));
    }
}
