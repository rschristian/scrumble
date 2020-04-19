package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.models.Sprint;

import java.util.ArrayList;
import java.util.List;

public interface ISprintService {

    Sprint createSprint(int workspaceId, Sprint sprint, String accessToken);

    void deleteSprint(int sprintId);

    List<Sprint> getSprintsForWorkspace(int workspaceId, String filter);

    Sprint editSprint(int workspaceId, Sprint sprint, String accessToken);

    List<Sprint> getPageOfSprints(int workspaceId, int pageNumber, int pageSize);

    Issue setSprintForIssue(int workspaceId, Issue issue, List<Sprint> sprints);

    int getMilestoneId(int workspaceId, int projectId, int sprintId);

    ArrayList<Issue> getSprintIssues(int workspaceId, Sprint sprint, String accessToken);
}
