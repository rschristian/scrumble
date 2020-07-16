package com.bt.scrumble.core.workspace;

import com.bt.scrumble.application.data.WorkspaceData;
import com.bt.scrumble.core.project.Project;

import java.util.ArrayList;
import java.util.List;

public interface WorkspaceService {
  List<WorkspaceData> getAllWorkspaces();

  ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId);

  List<Project> getWorkspaceProjects(int workspaceId);
}
