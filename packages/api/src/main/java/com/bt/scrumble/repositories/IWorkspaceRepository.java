package com.bt.scrumble.repositories;

import com.bt.scrumble.models.User;
import com.bt.scrumble.models.Workspace;
import io.opentracing.Span;

import java.util.ArrayList;
import java.util.List;

public interface IWorkspaceRepository {

    List<Workspace> getAllWorkspaces(Span span);

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId, Span span);

    Workspace createWorkspace(Workspace workspace, User user, Span span);

    void editWorkspace(Workspace updatedWorkspace, Span span);

    List<User> workspaceUserList(int workspaceId);
}
