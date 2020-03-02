package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.models.User;

import java.util.Optional;

public interface IUserService {
    User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

    Optional<User> findUserById(int id);

    void addToken(int userId, String token);

    void removeToken(int userId);

    Optional<String> getToken(int userId);
}
