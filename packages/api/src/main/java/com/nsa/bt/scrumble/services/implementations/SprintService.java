package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.errorhandlers.MilestoneRestTemplateResponseErrorHandler;
import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.repositories.ISprintRepository;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.ISprintService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SprintService implements ISprintService {

    private static final Logger logger = LoggerFactory.getLogger(SprintService.class);

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    ISprintRepository sprintRepository;

    @Autowired
    IWorkspaceRepository workspaceRepository;

    private final RestTemplate restTemplate;

    @Autowired
    public SprintService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder
                .errorHandler(new MilestoneRestTemplateResponseErrorHandler())
                .build();
    }

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
    public List<Sprint> getSprintsForWorkspace(int workspaceId, String filter) {
        return sprintRepository.getAllSprintsForWorkspace(workspaceId, filter);
    }

    @Override
    public Sprint editSprint(int workspaceId, Sprint sprint, String accessToken) {
        for (Map.Entry<String, Integer> pair : sprintRepository.getProjectIdsToMileStoneIds(sprint.getId()).entrySet()) {
            editGitLabMilestone(Integer.parseInt(pair.getKey()), pair.getValue(), sprint, accessToken);
        }
        return sprintRepository.editSprint(workspaceId, sprint);
    }

    @Override
    public List<Sprint> getPageOfSprints(int workspaceId, int pageNumber, int pageSize) {
        return sprintRepository.getPageOfSprints(workspaceId, pageNumber, pageSize);
    }

    private void editGitLabMilestone(int projectId, int milestoneId, Sprint sprint, String accessToken) {
        String stateEvent;
        if(sprint.getStatus().equalsIgnoreCase("active")) {
            stateEvent = "activate";
        } else {
            stateEvent = "close";
        }
        String uri = String.format("%s/projects/%d/milestones/%d?title=%s&description=%s&start_date=%tF&due_date=%tF&state_event=%s&access_token=%s",
                gitLabApiUrl, projectId, milestoneId, sprint.getTitle(), sprint.getDescription(), sprint.getStartDate(), sprint.getDueDate(), stateEvent, accessToken);
        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.PUT, null, String.class);
        logger.info(String.format("Response code: %d", response.getStatusCodeValue()));
    }
}
