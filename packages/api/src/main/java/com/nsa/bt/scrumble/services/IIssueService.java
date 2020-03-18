package com.nsa.bt.scrumble.services;

import org.springframework.stereotype.Service;

@Service
public interface IIssueService {
    Object getIssuesPage(int workspaceId, int[] projectIds, String accessToken, int pageNum);
}
