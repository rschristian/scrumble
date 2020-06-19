package com.bt.scrumble.api.v1;

import com.bt.scrumble.api.v1.security.UserPrincipal;
import com.bt.scrumble.application.dto.Issue;
import com.bt.scrumble.application.dto.IssuePageResult;
import com.bt.scrumble.core.issue.IssueService;
import com.bt.scrumble.core.issuePaging.IssuePagingService;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class IssuesApi {

  private static final Logger LOGGER = LoggerFactory.getLogger(IssuesApi.class);

    @Autowired
    private UserService userService;

  @Value("${app.msg.error.auth}")
  private String authErrorMsg;

    @Autowired
    private IssuePagingService issuePagingService;

    @Autowired
    private IssueService issueService;

    @Autowired
    private WorkspaceService workspaceService;

  @GetMapping("/workspace/{id}/issues")
  public ResponseEntity<Object> getIssues(
      Authentication auth,
      @PathVariable(value = "id") int workspaceId,
      @RequestParam(value = "projectId") int projectId,
      @RequestParam(value = "page") int page,
      @RequestParam(value = "filter") String filter,
      @RequestParam(value = "searchFor") String searchTerm) {
    Optional<String> accessTokenOptional =
        userService.getToken(((UserPrincipal) auth.getPrincipal()).getId());
    if (accessTokenOptional.isEmpty()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", authErrorMsg));
    }

    if (workspaceService.getProjectIdsForWorkspace(workspaceId).isEmpty()) {
      return ResponseEntity.ok()
          .body(Map.of("message", "You haven't added any projects to your workspace!"));
    }

    IssuePageResult issuePageResult =
        issuePagingService.getPageOfIssues(
            workspaceId, projectId, page, filter, searchTerm, accessTokenOptional.get());
    return ResponseEntity.ok().body(issuePageResult);
  }

  @PostMapping("/workspace/{workspaceId}/project/{projectId}/issue")
  public ResponseEntity<Object> createIssue(
      Authentication authentication,
      @PathVariable(value = "workspaceId") int workspaceId,
      @PathVariable(value = "projectId") int projectId,
      @RequestBody Issue issue) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

    if (!issue.getAssignee().getProjectIds().contains(projectId)) {
      LOGGER.error("User does not exist on this project");
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body(Map.of("message", "User does not exist on this project"));
    }

    if (accessTokenOptional.isPresent()) {
      issue = issueService.createIssue(workspaceId, projectId, issue, accessTokenOptional.get());
      return ResponseEntity.ok().body(issue);
    }

    LOGGER.error("Unable to authenticate with authentication provider");
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", authErrorMsg));
  }

  @PutMapping("/workspace/{workspaceId}/project/{projectId}/issue/{issueId}")
  public ResponseEntity<Object> editIssue(
      Authentication authentication,
      @PathVariable(value = "workspaceId") int workspaceId,
      @PathVariable(value = "projectId") int projectId,
      @PathVariable(value = "issueId") int issueId,
      @RequestBody Issue issue) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

    if (!issue.getAssignee().getProjectIds().contains(projectId)) {
      LOGGER.error("User does not exist on this project");
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body(Map.of("message", "User does not exist on this project"));
    }

    if (accessTokenOptional.isPresent()) {
      issue = issueService.editIssue(workspaceId, projectId, issue, accessTokenOptional.get());
      return ResponseEntity.ok().body(issue);
    }

    LOGGER.error("Unable to authenticate with authentication provider");
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", authErrorMsg));
  }
}
