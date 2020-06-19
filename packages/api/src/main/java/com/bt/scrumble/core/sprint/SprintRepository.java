package com.bt.scrumble.core.sprint;

import com.bt.scrumble.application.data.SprintData;

import java.util.List;

public interface SprintRepository {

  SprintData getSprintById(int sprintId);

  List<SprintData> getAllSprintsForWorkspace(int workspaceId, String filter);
}
