package com.bt.scrumble.core.sprint;

import com.bt.scrumble.application.data.SprintData;
import com.bt.scrumble.core.issue.Issue;

import java.util.ArrayList;
import java.util.List;

public interface SprintService {
    SprintData createSprint(int workspaceId, SprintData sprint, String accessToken);

    SprintData editSprint(int workspaceId, SprintData sprint, String accessToken);

    List<SprintData> getSprintsForWorkspace(int workspaceId, String filter);

    Issue setSprintForIssue(int workspaceId, Issue issue, List<SprintData> sprints);

    int getMilestoneId(int workspaceId, int projectId, int sprintId);

    ArrayList<Issue> getSprintIssues(int workspaceId, SprintData sprint, String accessToken);
}
