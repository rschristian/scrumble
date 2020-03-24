package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface IIssueService {

    void setStoryPoint(Issue issue);

    void filterAndSetStoryPoint(ArrayList<Issue> issues);

    ArrayList<Issue> searchForIssue(int workspaceId, String searchFor, String filter, String accessToken);

    String getFilterQuery(String filter);
}
