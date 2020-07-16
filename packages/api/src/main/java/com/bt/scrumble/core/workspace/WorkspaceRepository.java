package com.bt.scrumble.core.workspace;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.application.data.WorkspaceData;

import java.util.ArrayList;
import java.util.List;

public interface WorkspaceRepository {

  List<WorkspaceData> getAllWorkspaces();

  ArrayList<Integer> projectIdsForWorkspace(int workspaceId);

  List<UserData> workspaceUserList(int workspaceId);
}
