package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.models.Sprint;

import java.util.List;

public interface ISprintService {

    Sprint createSprint(int workspaceId, Sprint sprint);

    void deleteSprint(int sprintId);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId);
}
