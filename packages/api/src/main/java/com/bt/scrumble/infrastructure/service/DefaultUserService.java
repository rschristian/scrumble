package com.bt.scrumble.infrastructure.service;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.issue.Issue;
import com.bt.scrumble.core.user.UserRepository;
import com.bt.scrumble.core.user.UserService;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DefaultUserService implements UserService {

  private final UserRepository userRepository;
  private final WorkspaceRepository workspaceRepository;

  @Autowired
  public DefaultUserService(
      UserRepository userRepository, WorkspaceRepository workspaceRepository) {
    this.userRepository = userRepository;
    this.workspaceRepository = workspaceRepository;
  }

  @Override
  public UserData createUser(UserData user) {
    user = userRepository.createUser(user);
    return user;
  }

  @Override
  public Optional<UserData> findUserByServiceId(int serviceId) {
    return userRepository.findUserByServiceId(serviceId);
  }

  @Override
  public Optional<UserData> findUserById(int id) {
    return userRepository.findUserById(id);
  }

  @Override
  public Optional<String> getToken(int userId) {
    return userRepository.getToken(userId);
  }

  @Override
  public void addToken(int userId, String token) {
    userRepository.addToken(userId, token);
  }

  @Override
  public void removeToken(int userId) {
    userRepository.removeToken(userId);
  }

  @Override
  public void setProjectId(int workspaceId, Issue issue) {
    ObjectMapper mapper = new ObjectMapper();
    List<UserData> userList =
        mapper.convertValue(
            workspaceRepository.workspaceUserList(workspaceId),
            new TypeReference<List<UserData>>() {});
    ArrayList<UserData> userArray = new ArrayList();
    userArray.addAll(userList);
    userArray.forEach(
        user -> {
          if (issue.getAssignee().getId() == user.getId()) {
            issue.getAssignee().setProjectIds(user.getProjectIds());
          }
        });
  }
}
