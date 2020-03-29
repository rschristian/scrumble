package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;

import java.util.List;

public interface IWorkspaceService {

    int[] getProjectIdsForWorkspace(int workspaceId);

    Workspace createWorkspace(Workspace workspace, User user);

    List<Workspace> getAllWorkspaces();

    void deleteWorkspace(int workspaceId);

    void editWorkspace(Workspace updatedWorkspace);
}