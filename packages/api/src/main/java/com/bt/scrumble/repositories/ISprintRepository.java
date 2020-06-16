package com.bt.scrumble.repositories;

import com.bt.scrumble.models.Sprint;

import java.util.List;
import java.util.Map;

public interface ISprintRepository {

    Sprint getSprintById(int sprintId);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter);

    Map<String, Integer> getProjectIdsToMilestoneIds(int sprintId);

    Sprint createSprint(int workspaceId, Sprint sprint);

    Sprint editSprint(int workspaceId, Sprint sprint);
}
