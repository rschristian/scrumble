package com.nsa.bt.scrumble.repositories;

import com.nsa.bt.scrumble.models.User;

import java.util.Optional;

public interface IUserRepository {

    User createUser(User user);

    Optional<User> findUserByServiceId(int serviceId);

<<<<<<< HEAD
    Optional<User> findUserById(int id);

    void addToken(int userId, String token);

    void removeToken(int userId);

    Optional<String> getToken(int userId);
=======
    Optional<User> findUserById(int serviceId);
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
}
