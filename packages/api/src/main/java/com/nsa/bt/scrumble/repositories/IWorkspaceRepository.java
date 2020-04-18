package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import io.opentracing.Span;

import java.util.ArrayList;
import java.util.List;

public interface IWorkspaceRepository {

    List<Workspace> getAllWorkspaces(Span span);

    ArrayList<Integer> projectIdsForWorkspace(int workspaceId, Span span);

    Workspace createWorkspace(Workspace workspace, User user);

    void editWorkspace(Workspace updatedWorkspace);
}
