package com.bt.scrumble.services;

import com.bt.scrumble.dto.Project;
import com.bt.scrumble.models.User;
import com.bt.scrumble.models.Workspace;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface IWorkspaceService {
  List<Workspace> getAllWorkspaces();

  ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId);

  Workspace createWorkspace(Workspace workspace, User user);

  void editWorkspace(Workspace updatedWorkspace);

  List<Project> getWorkspaceProjects(int workspaceId, String accessToken);

  void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken);
}
