package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.repositories.ISprintRepository;
import com.nsa.bt.scrumble.services.ISprintService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class SprintService implements ISprintService {

    @Autowired
    ISprintRepository sprintRepository;

    @Override
    public Sprint createSprint(int workspaceId, Sprint sprint) {
        return sprintRepository.createSprint(workspaceId, sprint);
    }

    @Override
    public void deleteSprint(int sprintId) {
        sprintRepository.deleteSprint(sprintId);
    }

    @Override
    public List<Sprint> getAllSprintsForWorkspace(int workspaceId) {
        return null;
    }
}
