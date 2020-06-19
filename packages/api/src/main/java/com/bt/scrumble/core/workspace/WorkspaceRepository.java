package com.bt.scrumble.core.workspace;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.application.data.WorkspaceData;

import java.util.ArrayList;
import java.util.List;

public interface WorkspaceRepository {

    List<WorkspaceData> getAllWorkspaces();

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId);

    WorkspaceData createWorkspace(WorkspaceData workspace, UserData user);

    void editWorkspace(WorkspaceData updatedWorkspace);

    List<UserData> workspaceUserList(int workspaceId);
}
