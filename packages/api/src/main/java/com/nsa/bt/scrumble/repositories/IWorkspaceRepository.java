package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import io.opentracing.Span;

import java.util.ArrayList;
import java.util.List;

public interface IWorkspaceRepository {

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId);

    Workspace createWorkspace(Workspace workspace, User user);

    List<Workspace> getAllWorkspaces(Span span);

    void deleteWorkspace(int workspaceId);

    void editWorkspace(Workspace updatedWorkspace);
}
