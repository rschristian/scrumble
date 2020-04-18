package com.nsa.bt.scrumble.services;

import com.nsa.bt.scrumble.models.User;
import io.opentracing.Span;

import java.util.Optional;

public interface IUserService {
    User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

    Optional<User> findUserById(int id, Span span);

    Optional<String> getToken(int userId, Span span);

    void addToken(int userId, String token);

    void removeToken(int userId, Span span);
}
