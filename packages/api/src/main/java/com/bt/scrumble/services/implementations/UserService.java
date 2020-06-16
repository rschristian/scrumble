package com.bt.scrumble.services.implementations;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.models.User;
import com.bt.scrumble.repositories.IUserRepository;
import com.bt.scrumble.repositories.IWorkspaceRepository;
import com.bt.scrumble.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IWorkspaceRepository workspaceRepository;

    @Override
    public User createUser(User user) {
        user = userRepository.createUser(user);
        return user;
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
    public Optional<String> getToken(int userId) {
        return userRepository.getToken(userId);
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
    public void setProjectId(int workspaceId, Issue issue) {
        ObjectMapper mapper = new ObjectMapper();
        List<User> userList = mapper.convertValue(
                workspaceRepository.workspaceUserList(workspaceId),
                new TypeReference<List<User>>() {
                });
        ArrayList<User> userArray = new ArrayList();
        userArray.addAll(userList);
        userArray.forEach(user -> {
            if (issue.getAssignee().getId() == user.getId()) {
                issue.getAssignee().setProjectIds(user.getProjectIds());
            }
        });
    }
}
