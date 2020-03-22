package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.services.IIssueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.OptionalInt;


@Service
public class IssueService implements IIssueService {

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public void setStoryPoint(Issue issue) {
        OptionalInt storyPoint =issue.getLabels()
                .stream()
                .filter(IssueService::isInteger)
                .mapToInt(Integer::parseInt)
                .findFirst();

        if(storyPoint.isPresent()) {
            issue.setStoryPoint(storyPoint.getAsInt());
        }
    }

    @Override
    public void filterAndSetStoryPoint(ArrayList<Issue> issues) {
        issues.forEach(this::setStoryPoint);
    }

    // Ref: https://stackoverflow.com/a/5439547/11679751
    public static boolean isInteger(String s) {
        return isInteger(s,10);
    }

    public static boolean isInteger(String s, int radix) {
        if(s.isEmpty()) return false;
        for(int i = 0; i < s.length(); i++) {
            if(i == 0 && s.charAt(i) == '-') {
                if(s.length() == 1) return false;
                else continue;
            }
            if(Character.digit(s.charAt(i),radix) < 0) return false;
        }
        return true;
    }
}
