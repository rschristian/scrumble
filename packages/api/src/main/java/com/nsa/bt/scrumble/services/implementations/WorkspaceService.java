package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.services.IWorkspaceService;
import org.springframework.stereotype.Service;

@Service
public class WorkspaceService implements IWorkspaceService {

    @Override
    public int[] getProjectIdsForWorkspace(int workspaceId) {
//        return new int[]{ 4, 1, 8, 11, 5};
        return new int[]{ 8126, 8127 };
    }
}
