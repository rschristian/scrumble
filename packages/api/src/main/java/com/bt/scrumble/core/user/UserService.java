package com.bt.scrumble.core.user;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.issue.Issue;

import java.util.Optional;

public interface UserService {
    UserData createUser(UserData user);

    Optional<UserData> findUserByServiceId(int serviceId);

    Optional<UserData> findUserById(int id);

    Optional<String> getToken(int userId);

    void addToken(int userId, String token);

    void removeToken(int userId);

  void setProjectId(int workspaceId, Issue issue);
}
