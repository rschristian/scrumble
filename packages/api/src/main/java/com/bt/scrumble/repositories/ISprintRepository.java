package com.bt.scrumble.repositories;

import com.bt.scrumble.models.Sprint;
import io.opentracing.Span;

import java.util.List;
import java.util.Map;

public interface ISprintRepository {

    Sprint getSprintById(int sprintId, Span span);

    List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter, Span span);

    Map<String, Integer> getProjectIdsToMilestoneIds(int sprintId, Span span);

    Sprint createSprint(int workspaceId, Sprint sprint, Span span);

    Sprint editSprint(int workspaceId, Sprint sprint, Span span);
}
