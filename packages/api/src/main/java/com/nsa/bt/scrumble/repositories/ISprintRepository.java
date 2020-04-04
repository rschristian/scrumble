package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.Sprint;

import java.util.List;

public interface ISprintRepository {
    Sprint createSprint(int workspaceId, Sprint sprint);

    void deleteSprint(int sprintId);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId);
}
