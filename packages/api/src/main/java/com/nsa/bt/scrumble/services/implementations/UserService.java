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
    public User createUser(User user, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Create User").asChildOf(parentSpan).start();
        user = userRepository.createUser(user, span);
        span.finish();
        return user;
    }

    @Override
    public Optional<User> findUserByServiceId(int serviceId, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Find User by Service ID").asChildOf(parentSpan).start();
        var optionalUser = userRepository.findUserByServiceId(serviceId, span);
        span.finish();
        return optionalUser;
    }

    @Override
    public Optional<User> findUserById(int id, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Find User by ID").asChildOf(parentSpan).start();
        var user = userRepository.findUserById(id, span);
        span.finish();
        return user;
    }

    @Override
    public Optional<String> getToken(int userId, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Retrieve User's Token").asChildOf(parentSpan).start();
        var token = userRepository.getToken(userId, span);
        span.finish();
        return token;
    }

    @Override
    public void addToken(int userId, String token, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Add User Token").asChildOf(parentSpan).start();
        userRepository.addToken(userId, token, span);
        span.finish();
    }

    @Override
    public void removeToken(int userId, Span parentSpan) {
        var span = ServiceTracer.getTracer().buildSpan("Remove User's Token").asChildOf(parentSpan).start();
        userRepository.removeToken(userId, span);
        span.finish();
    }
}
