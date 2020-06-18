package com.bt.scrumble.repositories;

import com.bt.scrumble.models.User;

import java.util.Optional;

public interface IUserRepository {

  User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

    Optional<User> findUserById(int id);

    void addToken(int userId, String token);

    void removeToken(int userId);

    Optional<String> getToken(int userId);
}
