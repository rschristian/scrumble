package com.bt.scrumble.api.v1;

import com.bt.scrumble.core.issuePaging.IssuePageResult;
import com.bt.scrumble.core.issuePaging.IssuePagingService;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class IssuesApi {

  private final IssuePagingService issuePagingService;
  private final WorkspaceService workspaceService;

  @Autowired
  public IssuesApi(IssuePagingService issuePagingService, WorkspaceService workspaceService) {
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
