package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.models.Sprint;
import io.opentracing.Span;

import java.util.List;

public interface ISprintService {
    Sprint createSprint(int workspaceId, Sprint sprint, String accessToken, Span span);

    Sprint editSprint(int workspaceId, Sprint sprint, String accessToken, Span span);

    List<Sprint> getSprintsForWorkspace(int workspaceId, String filter, Span span);

    Issue setSprintForIssue(int workspaceId, Issue issue, List<Sprint> sprints, Span span);

    int getMilestoneId(int workspaceId, int projectId, int sprintId, Span span);
}
