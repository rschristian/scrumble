package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import org.redisson.api.RList;

public interface ICacheService {

    RList addToWorkspaceIssues(int workspaceId, Issue[] issues);

    RList getAllWorkspaceIssues(int workspaceId);

    void deleteWorkspaceIssues(int workspaceId);
}
