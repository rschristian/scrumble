package com.bt.scrumble.core.user;

import com.bt.scrumble.application.dto.Issue;
import com.bt.scrumble.application.models.User;

import java.util.Optional;

public interface UserService {
    User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

    Optional<User> findUserById(int id);

    Optional<String> getToken(int userId);

    void addToken(int userId, String token);

    void removeToken(int userId);

  void setProjectId(int workspaceId, Issue issue);
}
