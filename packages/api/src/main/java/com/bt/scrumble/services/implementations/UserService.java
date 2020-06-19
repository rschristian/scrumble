package com.bt.scrumble.services.implementations;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.models.User;
import com.bt.scrumble.repositories.IWorkspaceRepository;
import com.bt.scrumble.services.IUserService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {

  private final IWorkspaceRepository workspaceRepository;

  @Autowired
  public UserService(IWorkspaceRepository workspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }

  @Override
  public void setProjectId(int workspaceId, Issue issue) {
    ObjectMapper mapper = new ObjectMapper();
    List<User> userList =
        mapper.convertValue(
            workspaceRepository.workspaceUserList(workspaceId), new TypeReference<List<User>>() {});
    ArrayList<User> userArray = new ArrayList(userList);
    userArray.forEach(
        user -> {
          if (issue.getAssignee().getId() == user.getId()) {
            issue.getAssignee().setProjectIds(user.getProjectIds());
          }
        });
  }
}
