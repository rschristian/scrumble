package com.bt.scrumble.services;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.models.User;

import java.util.Optional;

public interface IUserService {
  User createUser(User user);

  Optional<User> findUserByServiceId(int serviceId);

  Optional<User> findUserById(int id);

  Optional<String> getToken(int userId);

  void addToken(int userId, String token);

  void removeToken(int userId);

  void setProjectId(int workspaceId, Issue issue);
}
