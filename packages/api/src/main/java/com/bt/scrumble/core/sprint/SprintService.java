package com.bt.scrumble.core.sprint;

import com.bt.scrumble.application.data.SprintData;
import com.bt.scrumble.core.issue.Issue;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface SprintService {
  List<SprintData> getSprintsForWorkspace(int workspaceId, String filter);

  Issue setSprintForIssue(int workspaceId, Issue issue, List<SprintData> sprints);

  ArrayList<Issue> getSprintIssues(int workspaceId, Map<String, Integer> projectIdToMilestoneIds);
}
