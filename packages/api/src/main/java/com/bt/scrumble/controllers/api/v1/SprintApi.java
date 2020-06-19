package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.models.Sprint;
import com.bt.scrumble.services.ISprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class SprintApi {

    private final ISprintService sprintService;

    @Autowired
    public SprintApi(ISprintService sprintService) {
        this.sprintService = sprintService;
    }

    @GetMapping("/workspace/{workspaceId}/sprints")
    public ResponseEntity<Object> getWorkspaceSprints(
            @PathVariable(value = "workspaceId") int workspaceId,
            @RequestParam(value = "filter") String filter) {
    return ResponseEntity.ok().body(sprintService.getSprintsForWorkspace(workspaceId, filter));
  }

  @GetMapping("/workspace/{workspaceId}/sprint/issues")
  public ResponseEntity<Object> getSprintIssues(
          @PathVariable(value = "workspaceId") int workspaceId,
          @RequestBody Sprint sprint
  ) {
    return ResponseEntity.ok().body(sprintService.getSprintIssues(workspaceId, sprint));
  }
}
