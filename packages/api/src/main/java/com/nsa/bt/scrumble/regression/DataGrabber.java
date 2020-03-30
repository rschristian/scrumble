package com.nsa.bt.scrumble.regression;
import org.springframework.stereotype.Service; 
import org.springframework.beans.factory.annotation.Autowired;
import com.nsa.bt.scrumble.dto.Issue;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.Arrays;

@Service
public class DataGrabber {
    private int[][] dataPoints = new int[][]{};

    @Autowired
    RestTemplate restTemplate;
    
    public void setDataPoints(Issue[] issues) {
        if( issues.length == 0) {
            this.dataPoints = new int[][]{};
        }
        for(int i = 0; i< issues.length; i++) {
            if(issues[i].getTimeSpent() > 0) {
                this.dataPoints[i][0] = issues[i].getStoryPoint();
                this.dataPoints[i][1] = issues[i].getTimeSpent();
            }
        }
    }

    public Issue[] getClosedIssues(String gitLabBaseUrl, int projectId, Optional<String> accessTokenOptional) {
        String closedIssuesUri = String.format("%1s/projects/%2s/issues?state=closed&access_token=%3s", gitLabBaseUrl, projectId, accessTokenOptional.get());
        ResponseEntity<Issue[]> closeIssuesResponse = restTemplate.getForEntity(closedIssuesUri, Issue[].class);
        Issue[] closedIssues = closeIssuesResponse.getBody();
        return closedIssues;
    }

    public int[][] getDataPoints() {
        return dataPoints;
    }
}