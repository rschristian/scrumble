package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.Project;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface IIssueService {

    void setStoryPoint(Issue issue);

    void setProjectName(Issue issue, Project[] projects);

    void filterAndSetStoryPoint(ArrayList<Issue> issues);

    ArrayList<Issue> searchForIssue(int workspaceId, String searchFor, String filter, String accessToken);

    String getFilterQuery(String filter);

    Issue createIssue(int workspaceId, int projectId, Issue issue, String accessToken);

    Issue editIssue(int workspaceId, int projectId, Issue issue, String accessToken);
}
