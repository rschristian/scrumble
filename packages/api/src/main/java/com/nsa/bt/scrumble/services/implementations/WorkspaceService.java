package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.services.IWorkspaceService;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService implements IWorkspaceService {

    @Override
    public int[] getProjectIdsForWorkspace(int workspaceId) {
        return new int[]{ 1, 5,  4, 5, 8 };
    }
}
