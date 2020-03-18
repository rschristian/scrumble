//package com.nsa.bt.scrumble.services.implementations;
//
//import com.nsa.bt.scrumble.dto.Issue;
//import com.nsa.bt.scrumble.services.ICacheService;
//import org.redisson.api.RList;
//import org.redisson.api.RedissonClient;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.Arrays;
//
//public class RedisService implements ICacheService {
//
//    @Autowired
//    RedissonClient redissonClient;
//
//    private String getIssuesKey(int workspaceId) {
//        return String.format("workspace:%d.issues", workspaceId);
//    }
//
//    @Override
//    public RList addToWorkspaceIssues(int workspaceId, Issue[] issues) {
//        RList<Issue> workspaceIssues = redissonClient.getList(getIssuesKey(workspaceId));
//        workspaceIssues.addAll(Arrays.asList(issues));
//        return workspaceIssues;
//    }
//
//    @Override
//    public RList getAllWorkspaceIssues(int workspaceId) {
//        return redissonClient.getList(getIssuesKey(workspaceId));
//    }
//
//    @Override
//    public void deleteWorkspaceIssues(int workspaceId) {
//
//    }
//
//    @Override
//    public boolean workspaceIssuesExist(int workspaceId) {
//        return redissonClient.getKeys().countExists(getIssuesKey(workspaceId)) > 0;
//    }
//}
