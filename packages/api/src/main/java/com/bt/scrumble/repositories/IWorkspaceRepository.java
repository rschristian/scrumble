package com.bt.scrumble.repositories;

import com.bt.scrumble.models.User;
import com.bt.scrumble.models.Workspace;

import java.util.ArrayList;
import java.util.List;

public interface IWorkspaceRepository {

    List<Workspace> getAllWorkspaces();

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId);

    Workspace createWorkspace(Workspace workspace, User user);

    void editWorkspace(Workspace updatedWorkspace);

    List<User> workspaceUserList(int workspaceId);
}
