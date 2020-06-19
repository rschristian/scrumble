package com.bt.scrumble.core.workspace;

import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.application.data.WorkspaceData;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface WorkspaceService {
    List<WorkspaceData> getAllWorkspaces();

    ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId);

    WorkspaceData createWorkspace(WorkspaceData workspace, UserData user);

    void editWorkspace(WorkspaceData updatedWorkspace);

    List<Project> getWorkspaceProjects(int workspaceId, String accessToken);

    void setWorkspaceUsers(WorkspaceData workspace, Optional<String> accessToken);
}
