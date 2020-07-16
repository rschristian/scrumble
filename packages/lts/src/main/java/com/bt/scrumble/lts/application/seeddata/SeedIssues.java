package com.bt.scrumble.lts.application.seeddata;

import com.bt.scrumble.lts.dto.Issue;
import com.bt.scrumble.lts.dto.Milestone;
import com.bt.scrumble.lts.dto.User;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

public class SeedIssues {
  private static final User user1 = SeedUsers.getUser1();
  private static final User user2 = SeedUsers.getUser2();
  private static final User user3 = SeedUsers.getUser3();
  private static final User user4 = SeedUsers.getUser4();

  private static final Milestone milestone1 = SeedMilestones.getMilestone1();
  private static final Milestone milestone2 = SeedMilestones.getMilestone2();
  private static final Milestone milestone3 = SeedMilestones.getMilestone3();
  private static final Milestone milestone4 = SeedMilestones.getMilestone4();
  private static final Milestone milestone5 = SeedMilestones.getMilestone5();

  private static final List<String> planned = Collections.singletonList("planned");
  private static final List<String> toDo = Collections.singletonList("To Do");
  private static final List<String> doing = Collections.singletonList("Doing");
  private static final List<String> unplanned = Collections.singletonList("None");
  private static final List<String> emptyTags = Collections.singletonList("");

  public static Issue[] getIssues() {
    return new Issue[] {
        new Issue(1, 1, "Burn down chart for a Milestone - showing progress against plan",
            "", user1, user2, "opened", milestone1, planned, LocalDateTime.now().toString()),
        new Issue(2, 1, "Ability to add a new issue (with corresponding add onto GitLab)",
            "", user3, user4, "opened", milestone1, toDo, LocalDateTime.now().toString()),
        new Issue(3, 1, "Ad-hoc filtering of issues table",
            "", user1, user2, "opened", milestone1, planned, LocalDateTime.now().toString()),
        new Issue(4, 1, "Show a planning view of issues - all issues for a milestone with no story points set",
            "", user3, user4, "opened", milestone1, toDo, LocalDateTime.now().toString()),
        new Issue(5, 1, "List workspaces I have access to",
            "", user4, user4, "opened", milestone1, doing, LocalDateTime.now().toString()),

        new Issue(1, 2, "Rename a Milestone causing the milestone to be renamed on GitLab",
            "", user2, user3, "opened", milestone2, doing, LocalDateTime.now().toString()),
        new Issue(2, 2, "Delete a Milestone causing a milestone to be removed on GitLab",
            "", user4, user1, "opened", milestone2, planned, LocalDateTime.now().toString()),
        new Issue(3, 2, "Create a new Milestone, causing a milestone to be created on GitLab",
            "", user2, user3, "opened", milestone2, toDo, LocalDateTime.now().toString()),
        new Issue(4, 2, "Define a concept of 'Milestone' mapped from GitLab milestone",
            "", user4, user1, "opened", milestone2, planned, LocalDateTime.now().toString()),
        new Issue(5, 2, "Define a concept of 'Status' mapped from GitLab 'labels'",
            "", user1, user1, "opened", milestone2, unplanned, LocalDateTime.now().toString()),

        new Issue(1, 3, "Define a concept of 'Story Points' mapped from GitLab 'labels'",
            "", user3, user4, "opened", milestone3, toDo, LocalDateTime.now().toString()),
        new Issue(2, 3, "Associate GitLab credentials with workspaces/projects",
            "", user1, user2, "opened", milestone3, doing, LocalDateTime.now().toString()),
        new Issue(3, 3, "Grant access rights of workspaces to particular users",
            "", user3, user4, "opened", milestone3, unplanned, LocalDateTime.now().toString()),
        new Issue(4, 3, "Set up Users and Passwords",
            "", user1, user2, "opened", milestone3, doing, LocalDateTime.now().toString()),
        new Issue(5, 3, "Associate the application with a specific GitLab instance",
            "", user2, user2, "opened", milestone3, toDo, LocalDateTime.now().toString()),

        new Issue(1, 4, "Edit a workspaces' list of GitLab projects",
            "", user4, user1, "opened", milestone4, doing, LocalDateTime.now().toString()),
        new Issue(2, 4, "Edit a workspace's name or description",
            "", user2, user3, "opened", milestone4, unplanned, LocalDateTime.now().toString()),
        new Issue(3, 4, "List workspaces",
            "", user4, user1, "opened", milestone4, doing, LocalDateTime.now().toString()),
        new Issue(4, 4, "Associate one or more GitLab projects with a workspace",
            "", user2, user3, "opened", milestone4, doing, LocalDateTime.now().toString()),
        new Issue(5, 4, "Define a new 'Workspace' with a name, description",
            "", user3, user3, "opened", milestone4, unplanned, LocalDateTime.now().toString()),

        new Issue(1, 5, "Milestone Metrics - expected story points vs actual (worked out from calculating time spent on the card)",
            "", user4, user3, "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
        new Issue(2, 5, "Workspace Metrics view - showing key metrics for the workspace - total projects, average velocity etc",
            "", user2, user1, "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
        new Issue(3, 5, "Milestone Metrics view - showing by milestone, metrics showing the total issues completed, issues planned but not completed, and total story points",
            "", user4, user3, "opened", milestone5, emptyTags, LocalDateTime.now().toString()),
        new Issue(4, 5, "Burn down chart for a Milestone - showing progress against plan",
            "", user2, user1, "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
        new Issue(5, 5, "Ability to add a new issue (with corresponding add onto GitLab)",
            "", user1, user1, "closed", milestone5, emptyTags, LocalDateTime.now().toString()),
    };
  }
}
