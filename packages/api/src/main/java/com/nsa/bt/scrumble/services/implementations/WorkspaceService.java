package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkspaceService implements IWorkspaceService {

    @Autowired
    IWorkspaceRepository workspaceRepository;

    @Override
    public int[] getProjectIdsForWorkspace(int workspaceId) {
        return new int[]{ 4, 1, 8, 3, 5, 11 };
    }

    @Override
    public Workspace createWorkspace(Workspace workspace, User user) {
        return workspaceRepository.createWorkspace(workspace, user);
    }

    @Override
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.getAllWorkspaces();
    }

    @Override
    public void deleteWorkspace(int workspaceId) {
        workspaceRepository.deleteWorkspace(workspaceId);
    }

    @Override
    public void editWorkspace(Workspace updatedWorkspace) {
        workspaceRepository.editWorkspace(updatedWorkspace);
    }
}