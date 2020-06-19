package com.bt.scrumble.application;

import com.bt.scrumble.application.dto.Issue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DataGrabber {
  private int[][] dataPoints = new int[][] {};

  @Autowired private RestTemplate restTemplate;

  public Issue[] getClosedIssues(String gitLabBaseUrl, int projectId, String accessToken) {
    String closedIssuesUri =
        String.format(
            "%1s/projects/%2s/issues?state=closed&access_token=%3s",
            gitLabBaseUrl, projectId, accessToken);
    ResponseEntity<Issue[]> closeIssuesResponse =
        restTemplate.getForEntity(closedIssuesUri, Issue[].class);
    return closeIssuesResponse.getBody();
  }

  public int[][] getDataPoints() {
    return dataPoints;
  }

  public void setDataPoints(Issue[] issues) {
    if (issues.length == 0) {
      this.dataPoints = new int[][] {};
    } else {
      this.dataPoints = new int[issues.length][issues.length];
      for (int i = 0; i < issues.length; i++) {
        if (issues[i].getTimeSpent() > 0) {
          this.dataPoints[i][0] = issues[i].getStoryPoint();
          this.dataPoints[i][1] = issues[i].getTimeSpent();
        }
      }
    }
  }
}
