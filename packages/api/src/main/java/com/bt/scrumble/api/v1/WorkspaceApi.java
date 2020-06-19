package com.bt.scrumble.api.v1;

import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class WorkspaceApi {

  private final WorkspaceService workspaceService;

  @Autowired
  public WorkspaceApi(WorkspaceService workspaceService) {
    this.workspaceService = workspaceService;
  }

  @GetMapping("/workspaces")
  public ResponseEntity<Object> getAllWorkspaces() {
    return ResponseEntity.ok().body(workspaceService.getAllWorkspaces());
  }

  @GetMapping("/workspace/{id}/projects")
  public ResponseEntity<Object> getWorkspaceProjects(@PathVariable(value = "id") int workspaceId) {
    return ResponseEntity.ok().body(workspaceService.getWorkspaceProjects(workspaceId));
  }
}
