package com.bt.scrumble.core.user;

import com.bt.scrumble.application.models.User;

import java.util.Optional;

public interface UserRepository {

    User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

    Optional<User> findUserById(int id);

    void addToken(int userId, String token);

    void removeToken(int userId);

  Optional<String> getToken(int userId);
}
