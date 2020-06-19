package com.bt.scrumble.core.workspace;

import com.bt.scrumble.application.dto.Project;
import com.bt.scrumble.application.models.User;
import com.bt.scrumble.application.models.Workspace;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface WorkspaceService {
    List<Workspace> getAllWorkspaces();

    ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId);

    Workspace createWorkspace(Workspace workspace, User user);

    void editWorkspace(Workspace updatedWorkspace);

    List<Project> getWorkspaceProjects(int workspaceId, String accessToken);

    void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken);
}
