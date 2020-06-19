package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.data.WorkspaceData;
import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class DefaultWorkspaceService implements WorkspaceService {

  private final WorkspaceRepository workspaceRepository;
  private final RestTemplate restTemplate;

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired
  public DefaultWorkspaceService(
      WorkspaceRepository workspaceRepository, RestTemplate restTemplate) {
    this.workspaceRepository = workspaceRepository;
    this.restTemplate = restTemplate;
  }

  @Override
  public List<WorkspaceData> getAllWorkspaces() {
    return workspaceRepository.getAllWorkspaces();
  }

  @Override
  public ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId) {
    return workspaceRepository.projectIdsForWorkspace(workspaceId);
  }

  @Override
  public List<Project> getWorkspaceProjects(int workspaceId) {
    ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId);
    List<Project> result = new ArrayList<>();
    for (int projectId : projectIds) {
      String uri = String.format("%s/projects/%d", gitLabApiUrl, projectId);
      result.add(restTemplate.getForObject(uri, Project.class));
    }
    return result;
  }
}
