package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import io.opentracing.Span;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface IWorkspaceService {

    ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId, Span span);

    Workspace createWorkspace(Workspace workspace, User user);

    List<Workspace> getAllWorkspaces(Span span);

    void editWorkspace(Workspace updatedWorkspace);

    List<Project> getWorkspaceProjects(int workspaceId, String accessToken);

    void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken);
}
