package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.services.implementations.ServiceTracer;
import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import io.opentracing.Span;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.Hashtable;

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
    public List<Workspace> getAllWorkspaces(Span span) {
        Span newSpan = ServiceTracer.getTracer().buildSpan("Return all workspaces").asChildOf(span).start();
        var allWorkspaces = workspaceRepository.getAllWorkspaces(newSpan);
        newSpan.finish();
        return allWorkspaces;
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
    public List<Project> getWorkspaceProjects(int workspaceId, String accessToken) {
        ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId);
        List<Project> result = new ArrayList<>();
        for(int projectId : projectIds) {
            String uri = String.format("%s/projects/%d?simple=true&access_token=%3s",
                    gitLabApiUrl, projectId, accessToken);
            result.add(restTemplate.getForObject(uri, Project.class));
        }
        return result;
    }

    @Override
    public void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken) {
        List<User> allUsers = new ArrayList<User>();
        Hashtable<User, ArrayList<Integer>> usersProjectIds = new Hashtable<User, ArrayList<Integer>>();
            workspace.getProjectIds().forEach((projectId) -> {
                String uri = String.format("%1s/projects/%2s/users?access_token=%3s",
                gitLabApiUrl, projectId, accessToken.get());
                ResponseEntity<ArrayList<User>> projectUsersResponse = restTemplate.exchange(
                    uri, HttpMethod.GET, getApplicationJsonHeaders(), new ParameterizedTypeReference<>() {});
                ArrayList<User> projectUsers = projectUsersResponse.getBody();
                projectUsers.forEach((user) -> {
                    if(usersProjectIds.containsKey(user)) {
                        ArrayList<Integer> projectIdArray = usersProjectIds.get(user);
                        List<Integer> listWithoutDuplicates = projectIdArray.stream().distinct().collect(Collectors.toList()); // removes any duplicates
                        ArrayList<Integer> uniqueProjectIdArray = new ArrayList<Integer>();
                        uniqueProjectIdArray.addAll(listWithoutDuplicates);
                        uniqueProjectIdArray.add(projectId);
                        usersProjectIds.put(user, uniqueProjectIdArray);
                    } else {
                        ArrayList<Integer> newProjectIdArray = new ArrayList<Integer>();
                        newProjectIdArray.add(projectId);
                        usersProjectIds.put(user, newProjectIdArray);
                    }
                });
                allUsers.addAll(projectUsers);
            });
            Set<User> uniqueUsers = new HashSet<User>();
            uniqueUsers.addAll(allUsers); // getting all unique users
            List<User> resultant = new ArrayList<User>();
            resultant.addAll(uniqueUsers); // adding unique users to list instead of set
            resultant.forEach((user) -> {
                if(usersProjectIds.containsKey(user)) {
                    user.setProjectIds(usersProjectIds.get(user));
                }
            });
            workspace.setUsers(resultant);
    }

    private HttpEntity<String> getApplicationJsonHeaders() {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        return new HttpEntity(headers);
    }
}