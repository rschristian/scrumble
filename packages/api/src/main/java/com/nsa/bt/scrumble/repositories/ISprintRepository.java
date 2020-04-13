package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.Sprint;

import java.util.List;
import java.util.Map;

public interface ISprintRepository {
    Sprint createSprint(int workspaceId, Sprint sprint);

    void deleteSprint(int sprintId);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter);

    Sprint editSprint(int workspaceId, Sprint sprint);

    Sprint getSprintById(int sprintId);

    Map<String, Integer> getProjectIdsToMileStoneIds(int sprintId);

    List<Sprint> getPageOfSprints(int workspaceId, int pageNumber, int pageSize);

}
