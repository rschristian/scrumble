package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IWorkspaceService;
import io.opentracing.Span;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class WorkspaceService implements IWorkspaceService {
    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private IWorkspaceRepository workspaceRepository;

    @Override
    public List<Workspace> getAllWorkspaces(Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Get all Workspaces").asChildOf(parentSpan).start();
        var allWorkspaces = workspaceRepository.getAllWorkspaces(span);
        span.finish();
        return allWorkspaces;
    }

    @Override
    public ArrayList<Integer> getProjectIdsForWorkspace(int workspaceId, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Get Project IDs for a given Workspace").asChildOf(parentSpan).start();
        var projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId, span);
        span.finish();
        return projectIds;
    }

    @Override
    public Workspace createWorkspace(Workspace workspace, User user, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Create Workspace").asChildOf(parentSpan).start();
        workspace = workspaceRepository.createWorkspace(workspace, user, span);
        span.finish();
        return workspace;
    }

    @Override
    public void editWorkspace(Workspace updatedWorkspace, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Edit Workspace").asChildOf(parentSpan).start();
        workspaceRepository.editWorkspace(updatedWorkspace, span);
        span.finish();
    }

    @Override
    public List<Project> getWorkspaceProjects(int workspaceId, String accessToken, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Get all Workspace Projects").asChildOf(parentSpan).start();
        ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId, span);
        List<Project> result = new ArrayList<>();
        for (int projectId : projectIds) {
            String uri = String.format("%s/projects/%d?simple=true&access_token=%3s",
                    gitLabApiUrl, projectId, accessToken);
            result.add(restTemplate.getForObject(uri, Project.class));
        }
        span.finish();
        return result;
    }

    @Override
    public void setWorkspaceUsers(Workspace workspace, Optional<String> accessToken, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Set Workspace Users").asChildOf(parentSpan).start();
        List<User> allUsers = new ArrayList<>();
        Hashtable<User, ArrayList<Integer>> usersProjectIds = new Hashtable<>();

        for (var projectId : workspace.getProjectIds()) {
            String uri = String.format("%1s/projects/%2s/users?access_token=%3s",
                    gitLabApiUrl, projectId, accessToken.get());
            ResponseEntity<ArrayList<User>> projectUsersResponse = restTemplate.exchange(
                    uri, HttpMethod.GET, getApplicationJsonHeaders(span), new ParameterizedTypeReference<>() {
                    });
            ArrayList<User> projectUsers = projectUsersResponse.getBody();

            for (var user : projectUsers) {
                if (usersProjectIds.containsKey(user)) {
                    ArrayList<Integer> projectIdArray = usersProjectIds.get(user);
                    ArrayList<Integer> uniqueProjectIdArray = projectIdArray.stream().distinct().collect(Collectors.toCollection(ArrayList::new)); // removes any duplicates
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

        Set<User> uniqueUsers = new HashSet<>(allUsers); // getting all unique users
        List<User> resultant = new ArrayList<>(uniqueUsers); // adding unique users to list instead of set
        resultant.forEach((user) -> {
            if (usersProjectIds.containsKey(user)) {
                user.setProjectIds(usersProjectIds.get(user));
            }
        });
        workspace.setUsers(resultant);
        span.finish();
    }

    private HttpEntity<String> getApplicationJsonHeaders(Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Get Application Headers").asChildOf(parentSpan).start();
        var headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        span.finish();
        return new HttpEntity(headers);
    }
}
