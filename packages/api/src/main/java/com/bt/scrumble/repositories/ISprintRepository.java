package com.bt.scrumble.repositories;

import com.bt.scrumble.models.Sprint;

import java.util.List;

public interface ISprintRepository {

  Sprint getSprintById(int sprintId);

  List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter);
}
