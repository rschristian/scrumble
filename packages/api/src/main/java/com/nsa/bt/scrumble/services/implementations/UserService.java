package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.repositories.IUserRepository;
import com.nsa.bt.scrumble.services.IUserService;

import io.opentracing.Span;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public User createUser(User user, Span span) {
        return userRepository.createUser(user);
    }

    @Override
    public Optional<User> findUserByServiceId(int serviceId, Span span) {
        return userRepository.findUserByServiceId(serviceId);
    }

    @Override
    public Optional<User> findUserById(int id, Span span) {
        span = ServiceTracer.getTracer().buildSpan("Find User by ID").asChildOf(span).start();
        var user = userRepository.findUserById(id);
        span.finish();
        return user;
    }

    @Override
    public Optional<String> getToken(int userId, Span span) {
        span = ServiceTracer.getTracer().buildSpan("Retrieve User's Token").asChildOf(span).start();
        var token = userRepository.getToken(userId);
        span.finish();
        return token;
    }

    @Override
    public void addToken(int userId, String token, Span span) {
        userRepository.addToken(userId, token);
    }

    @Override
    public void removeToken(int userId, Span span) {
        span = ServiceTracer.getTracer().buildSpan("Remove User's Token").asChildOf(span).start();
        userRepository.removeToken(userId);
        span.finish();
    }
}
