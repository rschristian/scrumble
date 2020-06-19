package com.bt.scrumble.services;

import com.bt.scrumble.dto.Project;
import com.bt.scrumble.models.Workspace;

import java.util.ArrayList;
import java.util.List;

public interface IWorkspaceService {
  List<Workspace> getAllWorkspaces();

  ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId);

  List<Project> getWorkspaceProjects(int workspaceId);
}
