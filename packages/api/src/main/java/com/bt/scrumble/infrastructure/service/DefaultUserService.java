package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DefaultUserService implements UserService {

  private final WorkspaceRepository workspaceRepository;

  @Autowired
  public DefaultUserService(WorkspaceRepository workspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }

  @Override
  public void setProjectId(int workspaceId, Issue issue) {
    ObjectMapper mapper = new ObjectMapper();
    List<UserData> userList =
        mapper.convertValue(
            workspaceRepository.workspaceUserList(workspaceId),
            new TypeReference<>() {
            });
    var userArray = new ArrayList<>(userList);
    userArray.forEach(
        user -> {
          if (issue.getAssignee().getId() == user.getId()) {
            issue.getAssignee().setProjectIds(user.getProjectIds());
          }
        });
  }
}
