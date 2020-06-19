package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Project;
import com.bt.scrumble.models.Workspace;
import com.bt.scrumble.repositories.IWorkspaceRepository;
import com.bt.scrumble.services.IWorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkspaceService implements IWorkspaceService {
  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  private final RestTemplate restTemplate;
  private final IWorkspaceRepository workspaceRepository;

  @Autowired
  public WorkspaceService(RestTemplate restTemplate, IWorkspaceRepository workspaceRepository) {
    this.restTemplate = restTemplate;
    this.workspaceRepository = workspaceRepository;
  }

  @Override
  public List<Workspace> getAllWorkspaces() {
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
