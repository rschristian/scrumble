package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkspaceService implements IWorkspaceService {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceService.class);

    @Autowired
    IWorkspaceRepository workspaceRepository;

    @Override
    public ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId) {
        return workspaceRepository.projectIdsForWorkspace(workspaceId);
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