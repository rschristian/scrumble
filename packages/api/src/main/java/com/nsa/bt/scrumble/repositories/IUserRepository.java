package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.User;
import io.opentracing.Span;

import java.util.Optional;

public interface IUserRepository {

    User createUser(User user, Span span);

    Optional<User> findUserByServiceId(int serviceId, Span span);

    Optional<User> findUserById(int id, Span span);

    void addToken(int userId, String token, Span span);

    void removeToken(int userId, Span span);

    Optional<String> getToken(int userId, Span span);
}
