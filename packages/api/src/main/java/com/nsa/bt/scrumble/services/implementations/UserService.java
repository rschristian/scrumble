package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.repositories.IUserRepository;
import com.nsa.bt.scrumble.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.createUser(user);
    }

    @Override
    public Optional<User> findUserByServiceId(int serviceId) {
        return userRepository.findUserByServiceId(serviceId);
    }

    @Override
    public Optional<User> findUserById(int id) {
        return userRepository.findUserById(id);
    }

    @Override
    public void addToken(int userId, String token) {
        userRepository.addToken(userId, token);
    }

    @Override
    public void removeToken(int userId) {
        userRepository.removeToken(userId);
    }

    @Override
    public Optional<String> getToken(int userId) {
        return userRepository.getToken(userId);
    }
}
