package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.repositories.ISprintRepository;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.ISprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SprintService implements ISprintService {

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    ISprintRepository sprintRepository;

    @Autowired
    IWorkspaceRepository workspaceRepository;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public Sprint createSprint(int workspaceId, Sprint sprint, String accessToken) {
        String uri;
        var projectMilestoneIds = new HashMap<String, Integer>();
        ArrayList<Integer> projectIds = workspaceRepository.projectIdsForWorkspace(workspaceId);

        for (int projectId: projectIds) {
            uri = String.format("%s/projects/%d/milestones?title=%s&description=%s&start_date=%tF&due_date=%tF&access_token=%s",
                    gitLabApiUrl, projectId, sprint.getTitle(), sprint.getDescription(), sprint.getStartDate(), sprint.getDueDate(), accessToken);
            Sprint milestone = restTemplate.postForObject(uri, null , Sprint.class);
            projectMilestoneIds.put(Integer.toString(projectId), Math.toIntExact(milestone.getId()));
        }
        sprint.setProjectIdToMilestoneIds(projectMilestoneIds);
        return sprintRepository.createSprint(workspaceId, sprint);
    }

    @Override
    public void deleteSprint(int sprintId) {
        sprintRepository.deleteSprint(sprintId);
    }

    @Override
    public List<Sprint> getAllSprintsForWorkspace(int workspaceId) {
        return sprintRepository.getAllSprintsForWorkspace(workspaceId);
    }
}
