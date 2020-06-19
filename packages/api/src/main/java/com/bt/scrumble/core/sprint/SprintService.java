package com.bt.scrumble.core.sprint;

import com.bt.scrumble.application.dto.Issue;
import com.bt.scrumble.application.models.Sprint;

import java.util.ArrayList;
import java.util.List;

public interface SprintService {
    Sprint createSprint(int workspaceId, Sprint sprint, String accessToken);

    Sprint editSprint(int workspaceId, Sprint sprint, String accessToken);

    List<Sprint> getSprintsForWorkspace(int workspaceId, String filter);

    Issue setSprintForIssue(int workspaceId, Issue issue, List<Sprint> sprints);

    int getMilestoneId(int workspaceId, int projectId, int sprintId);

    ArrayList<Issue> getSprintIssues(int workspaceId, Sprint sprint, String accessToken);
}
