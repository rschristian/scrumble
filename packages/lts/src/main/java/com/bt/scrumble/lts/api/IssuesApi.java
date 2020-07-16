package com.bt.scrumble.lts.api;

import com.blade.mvc.RouteContext;
import com.blade.mvc.annotation.*;
import com.bt.scrumble.lts.application.seeddata.SeedIssues;
import com.bt.scrumble.lts.dto.Issue;
import com.bt.scrumble.lts.dto.Milestone;
import com.bt.scrumble.lts.dto.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Path
public class IssuesApi {
  @JSON
  @GetRoute("/projects/:projectId/issues")
  public Issue[] getIssues(
      RouteContext ctx,
      @PathParam Integer projectId,
      @Param String milestone,
      @Param String state,
      @Param String scope,
      @Param String search,
      @Param Integer page) {
    // For filter, milestone=None (unplanned), state=opened/closed, scope=all
    // Search is search term, match to description and title only

    // Here to compensate for janky API reading of pagination data
    if (projectId != 5) {
      ctx.header(
          "Link",
          String.format(
              "[<http://localhost:8001/projects/%d/issues?id=%d&page=%d&search=%s&state=%s>; rel=\"next\"]",
              projectId, projectId + 1, page, search, state));
    } else {
      ctx.header(
          "Link",
          String.format(
              "[<http://localhost:8001/projects/%d/issues?id=%d&page=%d&search=%s&state=%s>; rel=\"last\"]",
              projectId, projectId, page, search, state));
    }

    var max = projectId * 5;
    var min = max - 5;

    var issues = Arrays.copyOfRange(SeedIssues.getIssues(), min, max);

    if (!search.isEmpty()) {
      var issuesWithSearchTerm = new ArrayList<Issue>();
      for (var issue : issues) {
        if (issue.getTitle().contains(search) || issue.getDescription().contains(search)) {
          issuesWithSearchTerm.add(issue);
        }
      }
      issues = issuesWithSearchTerm.toArray(Issue[]::new);
    }

    if (state != null) {
      if (state.equals("opened")) {
        var issuesOpened = new ArrayList<Issue>();
        for (var issue : issues) {
          if (issue.getState().equals("opened")) {
            issuesOpened.add(issue);
          }
        }
        return issuesOpened.toArray(Issue[]::new);
      } else if (state.equals("closed")) {
        var issuesClosed = new ArrayList<Issue>();
        for (var issue : issues) {
          if (issue.getState().equals("closed")) {
            issuesClosed.add(issue);
          }
        }
        return issuesClosed.toArray(Issue[]::new);
      }
    } else if (milestone != null && milestone.equals("None")) {
      var issuesUnplanned = new ArrayList<Issue>();
      for (var issue : issues) {
        if (issue.getLabels().contains("None")) {
          issuesUnplanned.add(issue);
        }
      }
      return issuesUnplanned.toArray(Issue[]::new);
    } else if (scope != null && scope.equals("all")) {
      if (projectId < 6) {
        return issues;
      }
    }
    return new Issue[] {};
  }

  @JSON
  @GetRoute("/projects/:projectId/milestones/:milestoneId/issues")
  public Issue[] getSprintIssues(
      @PathParam Integer projectId,
      @PathParam Integer milestoneId) {

    var max = projectId * 5;
    var issues = Arrays.copyOfRange(SeedIssues.getIssues(), max - 5, max);

    var issuesInMilestone = new ArrayList<Issue>();
    for (var issue: issues) {
      if (issue.getMilestone().getId() == milestoneId) {
        issuesInMilestone.add(issue);
      }
    }

    return issuesInMilestone.toArray(Issue[]::new);
  }
}
