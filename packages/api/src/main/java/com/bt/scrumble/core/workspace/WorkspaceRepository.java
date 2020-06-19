package com.bt.scrumble.core.workspace;

import com.bt.scrumble.application.models.User;
import com.bt.scrumble.application.models.Workspace;

import java.util.ArrayList;
import java.util.List;

public interface WorkspaceRepository {

    List<Workspace> getAllWorkspaces();

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId);

    Workspace createWorkspace(Workspace workspace, User user);

    void editWorkspace(Workspace updatedWorkspace);

    List<User> workspaceUserList(int workspaceId);
}
