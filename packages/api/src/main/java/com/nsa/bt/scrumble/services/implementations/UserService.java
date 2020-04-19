package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.repositories.IUserRepository;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import com.nsa.bt.scrumble.services.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IWorkspaceRepository workspaceRepository;

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

    @Override
    public void setProjectId(int workspaceId, Issue issue) {
        ObjectMapper mapper = new ObjectMapper();
        List<User> userList = mapper.convertValue(
            workspaceRepository.workspaceUserList(workspaceId),
            new TypeReference<List<User>>() {});
        ArrayList<User> userArray = new ArrayList();
        userArray.addAll(userList);
        userArray.forEach(user -> {
            if(issue.getAssignee().getId() == user.getId()){
                issue.getAssignee().setProjectIds(user.getProjectIds());
            }
        });
    }
}
