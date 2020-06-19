package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.dto.IssuePageResult;
import com.bt.scrumble.services.IIssuePagingService;
import com.bt.scrumble.services.IWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class IssuesApi {

  private final IIssuePagingService issuePagingService;
  private final IWorkspaceService workspaceService;

  @Autowired
  public IssuesApi(IIssuePagingService issuePagingService, IWorkspaceService workspaceService) {
    this.issuePagingService = issuePagingService;
    this.workspaceService = workspaceService;
  }

  @GetMapping("/workspace/{id}/issues")
  public ResponseEntity<Object> getIssues(
      @PathVariable(value = "id") int workspaceId,
      @RequestParam(value = "projectId") int projectId,
      @RequestParam(value = "page") int page,
      @RequestParam(value = "filter") String filter,
      @RequestParam(value = "searchFor") String searchTerm) {
    if (workspaceService.getProjectIdsForWorkspace(workspaceId).isEmpty()) {
      return ResponseEntity.ok()
          .body(Map.of("message", "You haven't added any projects to your workspace!"));
    }

    IssuePageResult issuePageResult =
        issuePagingService.getPageOfIssues(workspaceId, projectId, page, filter, searchTerm);
    return ResponseEntity.ok().body(issuePageResult);
  }
}
