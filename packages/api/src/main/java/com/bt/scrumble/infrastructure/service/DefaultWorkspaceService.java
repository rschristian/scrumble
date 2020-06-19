package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.application.data.WorkspaceData;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.bt.scrumble.core.workspace.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DefaultWorkspaceService implements WorkspaceService {

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabApiUrl;

  @Autowired
  private RestTemplate restTemplate;

  @Autowired
  private WorkspaceRepository workspaceRepository;

  @Override
  public List<WorkspaceData> getAllWorkspaces() {
    return workspaceRepository.getAllWorkspaces();
  }

  @Override
  public ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId) {
    return workspaceRepository.projectIdsForWorkspace(workspaceId);
  }

  @Override
  public WorkspaceData createWorkspace(WorkspaceData workspace, UserData user) {
    workspace = workspaceRepository.createWorkspace(workspace, user);
    return workspace;
  }

  @Override
  public void editWorkspace(WorkspaceData updatedWorkspace) {
    workspaceRepository.editWorkspace(updatedWorkspace);
  }

  @Override
  public List<Project> getWorkspaceProjects(int workspaceId, String accessToken) {
    ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId);
    List<Project> result = new ArrayList<>();
    for (int projectId : projectIds) {
      String uri =
          String.format(
              "%s/projects/%d?simple=true&access_token=%3s", gitLabApiUrl, projectId, accessToken);
      result.add(restTemplate.getForObject(uri, Project.class));
    }
    return result;
  }

  @Override
  public void setWorkspaceUsers(WorkspaceData workspace, Optional<String> accessToken) {
    List<UserData> allUsers = new ArrayList<>();
    Hashtable<UserData, ArrayList<Integer>> usersProjectIds = new Hashtable<>();

    for (var projectId : workspace.getProjectIds()) {
      String uri =
              String.format(
                      "%1s/projects/%2s/users?access_token=%3s",
                      gitLabApiUrl, projectId, accessToken.get());
      ResponseEntity<ArrayList<UserData>> projectUsersResponse =
              restTemplate.exchange(
                      uri,
                      HttpMethod.GET,
                      getApplicationJsonHeaders(),
                      new ParameterizedTypeReference<>() {
                      });
      ArrayList<UserData> projectUsers = projectUsersResponse.getBody();

      for (var user : projectUsers) {
        if (usersProjectIds.containsKey(user)) {
          ArrayList<Integer> projectIdArray = usersProjectIds.get(user);
          ArrayList<Integer> uniqueProjectIdArray =
              projectIdArray.stream()
                  .distinct()
                  .collect(Collectors.toCollection(ArrayList::new)); // removes any duplicates
          uniqueProjectIdArray.add(projectId);
          usersProjectIds.put(user, uniqueProjectIdArray);
        } else {
          ArrayList<Integer> newProjectIdArray = new ArrayList<Integer>();
          newProjectIdArray.add(projectId);
          usersProjectIds.put(user, newProjectIdArray);
        }
      }
      allUsers.addAll(projectUsers);
    }

    Set<UserData> uniqueUsers = new HashSet<>(allUsers); // getting all unique users
    List<UserData> resultant =
        new ArrayList<>(uniqueUsers); // adding unique users to list instead of set
    resultant.forEach(
        (user) -> {
          if (usersProjectIds.containsKey(user)) {
            user.setProjectIds(usersProjectIds.get(user));
          }
        });
    workspace.setUsers(resultant);
  }

  private HttpEntity<String> getApplicationJsonHeaders() {
    var headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    return new HttpEntity(headers);
  }
}
