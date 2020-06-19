package com.bt.scrumble.core.sprint;

import com.bt.scrumble.application.models.Sprint;

import java.util.List;
import java.util.Map;

public interface SprintRepository {

    Sprint getSprintById(int sprintId);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter);

    Map<String, Integer> getProjectIdsToMilestoneIds(int sprintId);

    Sprint createSprint(int workspaceId, Sprint sprint);

    Sprint editSprint(int workspaceId, Sprint sprint);
}
