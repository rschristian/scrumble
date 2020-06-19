package com.bt.scrumbleLts.api;

import com.blade.mvc.RouteContext;
import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.Issue;
import com.bt.scrumbleLts.dto.Sprint;
import com.bt.scrumbleLts.dto.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Path
public class IssuesApi {

    private final List<String> planned = Collections.singletonList("planned");
    private final List<String> unplanned = Collections.singletonList("unplanned");

    private final Sprint sprint = new Sprint(1, "Requirement Gathering", "",
            "open", LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
            Map.of("1", 1,"2", 2));

    private Issue[] getSeedData() {
        return new Issue[] {
                new Issue(1, 1, "Burn down chart for a Sprint - showing progress against plan", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(2, 1, "Ability to add a new issue (with corresponding add onto GitLab)", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(3, 1, "Ad-hoc filtering of issues table", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(4, 1, "Show a planning view of issues - all issues for a sprint with no story points set", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(5, 1, "List workspaces I have access to", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),

                new Issue(1, 2, "Rename a Sprint causing the milestone to be renamed on GitLab", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(2, 2, "Delete a Sprint causing a milestone to be removed on GitLab", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(3, 2, "Create a new Sprint, causing a milestone to be created on GitLab", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(4, 2, "Define a concept of 'Sprint' mapped from GitLab milestone", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(5, 2, "Define a concept of 'Status' mapped from GitLab 'labels'", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),

                new Issue(1, 3, "Define a concept of 'Story Points' mapped from GitLab 'labels'", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(2, 3, "Associate GitLab credentials with workspaces/projects", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(3, 3, "Grant access rights of workspaces to particular users", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(4, 3, "Set up Users and Passwords", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(5, 3, "Associate the application with a specific GitLab instance", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),

                new Issue(1, 4, "Edit a workspaces' list of GitLab projects", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(2, 4, "Edit a workspace's name or description", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(3, 4, "List workspaces", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(4, 4, "Associate one or more GitLab projects with a workspace", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),
                new Issue(5, 4, "Define a new 'Workspace' with a name, description", "", new User(), new User(), "opened", sprint, planned, LocalDateTime.now().toString()),

                new Issue(1, 5, "Sprint Metrics - expected story points vs actual (worked out from calculating time spent on the card)", "", new User(), new User(), "closed", sprint, planned, LocalDateTime.now().toString()),
                new Issue(2, 5, "Workspace Metrics view - showing key metrics for the workspace - total projects, average velocity etc", "", new User(), new User(), "closed", sprint, unplanned, LocalDateTime.now().toString()),
                new Issue(3, 5, "Sprint Metrics view - showing by sprint, metrics showing the total issues completed, issues planned but not completed, and total story points", "", new User(), new User(), "opened", sprint, unplanned, LocalDateTime.now().toString()),
                new Issue(4, 5, "Burn down chart for a Sprint - showing progress against plan", "", new User(), new User(), "closed", sprint, unplanned, LocalDateTime.now().toString()),
                new Issue(5, 5, "Ability to add a new issue (with corresponding add onto GitLab)", "", new User(), new User(), "closed", sprint, unplanned, LocalDateTime.now().toString()),
        };
    }

    @JSON
    @GetRoute("/projects/:projectId/issues")
    public Issue[] getIssues(RouteContext ctx, @PathParam Integer projectId, @Param String state,
                             @Param String scope, @Param String labels, @Param String search, @Param Integer page) {
        // For filter, state=opened/closed, scope=all, labels=unplanned
        // Search is search term, match to description and title only

        // Here to compensate for janky API reading of pagination data
        if (projectId != 5) {
            ctx.header("Link", String.format("[<http://localhost:8001/projects/%d/issues?id=%d&page=%d&search=%s&state=%s>; rel=\"next\"]",
                    projectId, projectId + 1, page, search, state));
        } else {
            ctx.header("Link", String.format("[<http://localhost:8001/projects/%d/issues?id=%d&page=%d&search=%s&state=%s>; rel=\"last\"]",
                    projectId, projectId, page, search, state));
        }

        var max = projectId * 5;
        var min = max - 5;

        var issues = Arrays.copyOfRange(getSeedData(), min, max);

        if (!search.isEmpty()) {
            var issuesWithSearchTerm = new ArrayList<Issue>();
            for (var issue: issues) {
                if (issue.getTitle().contains(search) || issue.getDescription().contains(search)) {
                    issuesWithSearchTerm.add(issue);
                }
            }
            issues = issuesWithSearchTerm.toArray(Issue[]::new);
        }

        if (state != null) {
            if (state.equals("opened")) {
                var issuesOpened = new ArrayList<Issue>();
                for (var issue: issues) {
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
            var issuesUnplanned= new ArrayList<Issue>();
            for (var issue: issues) {
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
        return new Issue[]{};
    }
}
