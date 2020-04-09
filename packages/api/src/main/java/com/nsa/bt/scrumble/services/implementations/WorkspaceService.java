package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Set;

@Service
public class WorkspaceService implements IWorkspaceService {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceService.class);

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    RestTemplate restTemplate;

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

    @Override
    public void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken) {
        List<User> allUsers = new ArrayList<User>();
        ArrayList<Integer> projectIds = new ArrayList<Integer>();
            workspace.getProjectIds().forEach((projectId) -> {
                String uri = String.format("%1s/projects/%2s/users?access_token=%3s",
                gitLabApiUrl, projectId, accessToken.get());
                ResponseEntity<ArrayList<User>> projectUsersResponse = restTemplate.exchange(
                    uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
                ArrayList<User> projectUsers = projectUsersResponse.getBody();
                projectIds.add(projectId); 
                projectUsers.forEach((user) -> {
                    user.setProjectIds(projectIds);
                });
                allUsers.addAll(projectUsers);
            });
            Set<User> uniqueUsers = new HashSet<User>();
            // getting all unique users
            uniqueUsers.addAll(allUsers);
            List<User> resultant = new ArrayList<User>();
            // adding unique users to list instead of set
            resultant.addAll(uniqueUsers);
            workspace.setUsers(resultant);
    }

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }
}