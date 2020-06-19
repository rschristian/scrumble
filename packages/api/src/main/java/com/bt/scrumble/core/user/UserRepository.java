package com.bt.scrumble.core.user;

import com.bt.scrumble.application.data.UserData;

import java.util.Optional;

public interface UserRepository {

    UserData createUser(UserData user);

    Optional<UserData> findUserByServiceId(int serviceId);

    Optional<UserData> findUserById(int id);

    void addToken(int userId, String token);

    void removeToken(int userId);

  Optional<String> getToken(int userId);
}
