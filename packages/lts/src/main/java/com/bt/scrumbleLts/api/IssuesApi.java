package com.bt.scrumbleLts.api;

import com.blade.mvc.RouteContext;
import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.Issue;
import com.bt.scrumbleLts.dto.Milestone;
import com.bt.scrumbleLts.dto.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Path
public class IssuesApi {

  private final List<String> planned = Collections.singletonList("planned");
  private final List<String> toDo = Collections.singletonList("To Do");
  private final List<String> doing = Collections.singletonList("Doing");
  private final List<String> unplanned = Collections.singletonList("unplanned");
  private final List<String> emptyTags = Collections.singletonList("");

  private final Milestone milestone1 =
      new Milestone(1, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5));

  private final Milestone milestone2 =
      new Milestone(2, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5));

  private final Milestone milestone3 =
      new Milestone(3, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5));

  private final Milestone milestone4 =
      new Milestone(4, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5));

  private final Milestone milestone5 =
      new Milestone(5, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5));

  private Issue[] getSeedData() {
    return new Issue[] {
      new Issue(1, 1, "Burn down chart for a Milestone - showing progress against plan",
          "", new User(), new User(), "opened", milestone1, planned, LocalDateTime.now().toString()),
      new Issue(2, 1, "Ability to add a new issue (with corresponding add onto GitLab)",
          "", new User(), new User(), "opened", milestone1, toDo, LocalDateTime.now().toString()),
      new Issue(3, 1, "Ad-hoc filtering of issues table",
          "", new User(), new User(), "opened", milestone1, planned, LocalDateTime.now().toString()),
      new Issue(4, 1, "Show a planning view of issues - all issues for a milestone with no story points set",
          "", new User(), new User(), "opened", milestone1, toDo, LocalDateTime.now().toString()),
      new Issue(5, 1, "List workspaces I have access to",
          "", new User(), new User(), "opened", milestone1, doing, LocalDateTime.now().toString()),

      new Issue(1, 2, "Rename a Milestone causing the milestone to be renamed on GitLab",
          "", new User(), new User(), "opened", milestone2, doing, LocalDateTime.now().toString()),
      new Issue(2, 2, "Delete a Milestone causing a milestone to be removed on GitLab",
          "", new User(), new User(), "opened", milestone2, planned, LocalDateTime.now().toString()),
      new Issue(3, 2, "Create a new Milestone, causing a milestone to be created on GitLab",
          "", new User(), new User(), "opened", milestone2, toDo, LocalDateTime.now().toString()),
      new Issue(4, 2, "Define a concept of 'Milestone' mapped from GitLab milestone",
          "", new User(), new User(), "opened", milestone2, planned, LocalDateTime.now().toString()),
      new Issue(5, 2, "Define a concept of 'Status' mapped from GitLab 'labels'",
          "", new User(), new User(), "opened", milestone2, unplanned, LocalDateTime.now().toString()),

      new Issue(1, 3, "Define a concept of 'Story Points' mapped from GitLab 'labels'",
          "", new User(), new User(), "opened", milestone3, toDo, LocalDateTime.now().toString()),
      new Issue(2, 3, "Associate GitLab credentials with workspaces/projects",
          "", new User(), new User(), "opened", milestone3, doing, LocalDateTime.now().toString()),
      new Issue(3, 3, "Grant access rights of workspaces to particular users",
          "", new User(), new User(), "opened", milestone3, unplanned, LocalDateTime.now().toString()),
      new Issue(4, 3, "Set up Users and Passwords",
          "", new User(), new User(), "opened", milestone3, doing, LocalDateTime.now().toString()),
      new Issue(5, 3, "Associate the application with a specific GitLab instance",
          "", new User(), new User(), "opened", milestone3, toDo, LocalDateTime.now().toString()),

      new Issue(1, 4, "Edit a workspaces' list of GitLab projects",
          "", new User(), new User(), "opened", milestone4, doing, LocalDateTime.now().toString()),
      new Issue(2, 4, "Edit a workspace's name or description",
          "", new User(), new User(), "opened", milestone4, unplanned, LocalDateTime.now().toString()),
      new Issue(3, 4, "List workspaces",
          "", new User(), new User(), "opened", milestone4, doing, LocalDateTime.now().toString()),
      new Issue(4, 4, "Associate one or more GitLab projects with a workspace",
          "", new User(), new User(), "opened", milestone4, doing, LocalDateTime.now().toString()),
      new Issue(5, 4, "Define a new 'Workspace' with a name, description",
          "", new User(), new User(), "opened", milestone4, unplanned, LocalDateTime.now().toString()),

      new Issue(1, 5, "Milestone Metrics - expected story points vs actual (worked out from calculating time spent on the card)",
          "", new User(), new User(), "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
      new Issue(2, 5, "Workspace Metrics view - showing key metrics for the workspace - total projects, average velocity etc",
          "", new User(), new User(), "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
      new Issue(3, 5, "Milestone Metrics view - showing by milestone, metrics showing the total issues completed, issues planned but not completed, and total story points",
          "", new User(), new User(), "opened", milestone5, emptyTags, LocalDateTime.now().toString()),
      new Issue(4, 5, "Burn down chart for a Milestone - showing progress against plan",
          "", new User(), new User(), "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
      new Issue(5, 5, "Ability to add a new issue (with corresponding add onto GitLab)",
          "", new User(), new User(), "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
    };
  }

  @JSON
  @GetRoute("/projects/:projectId/issues")
  public Issue[] getIssues(
      RouteContext ctx,
      @PathParam Integer projectId,
      @Param String state,
      @Param String scope,
      @Param String labels,
      @Param String search,
      @Param Integer page) {
    // For filter, state=opened/closed, scope=all, labels=unplanned
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

    var issues = Arrays.copyOfRange(getSeedData(), min, max);

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
    } else if (labels != null && labels.equals("unplanned")) {
      var issuesUnplanned = new ArrayList<Issue>();
      for (var issue : issues) {
        if (issue.getLabels().contains("unplanned")) {
          issuesUnplanned.add(issue);
        }
      }
      return issuesUnplanned.toArray(Issue[]::new);
    } else if (scope != null && scope.equals("all")) {
      if (projectId < 6) {
        return Arrays.copyOfRange(getSeedData(), min, max);
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
    var issues = Arrays.copyOfRange(getSeedData(), max - 5, max);

    var issuesInMilestone = new ArrayList<Issue>();
    for (var issue: issues) {
      if (issue.getMilestone().getId() == milestoneId) {
        issuesInMilestone.add(issue);
      }
    }

    return issuesInMilestone.toArray(Issue[]::new);
  }
}
