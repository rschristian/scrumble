package com.nsa.bt.scrumble.regression;
import com.nsa.bt.scrumble.dto.Issue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

// Based off of Least Square regression
// Read more here https://www.mathsisfun.com/data/least-squares-regression.html
@Service
public class LinearRegression {
    private double c, m;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    DataGrabber dataGrabber;

    public void trainModel(int[][] dataPoints) {
        if(dataPoints.length < 10) { // if not enough data given resorts to default values
            dataPoints = new int[][]{{1,28800},{2,86400},{3,144000},{5,201600},{8,288000}};
        }
        int valuesLength = dataPoints.length;
        int sumX = 0;
        int sumY = 0;
        int sumXx = 0;
        int sumXy = 0;
        for(int i = 0; i < valuesLength; i++) {
            sumX += dataPoints[i][0];
            sumY += dataPoints[i][1];
            sumXx += dataPoints[i][0]*dataPoints[i][0];
            sumXy += dataPoints[i][0]*dataPoints[i][1];
        }
        double xBar = sumX / valuesLength;
        double yBar = sumY / valuesLength;
        double xXBar = 0.0;
        double yYBar = 0.0;
        double xYBar = 0.0;
        // Calculating distance of each point from line of best fit
        for (int i = 0; i < valuesLength; i++) {
            xXBar += (dataPoints[i][0] - xBar) * (dataPoints[i][0] - xBar);
            yYBar += (dataPoints[i][1] - yBar) * (dataPoints[i][1] - yBar);
            xYBar += (dataPoints[i][0] - xBar) * (dataPoints[i][1] - yBar);
        }
        // calculating coefficient and y intercept for linear equation: y=mx+c
        m  = xYBar / xXBar;
        c = yBar - m * xBar;
    }

    public double predict(int x) {
        return m * x + c; // Finds y value
    }

    // Default conversion rates are 1mo = 4w, 1w = 5d and 1d = 8h.
    public String timeConversion(double time) {
        double tmp = time;
        String timeString = "";
        if(time < 3600) { // defaults to 1 hour
            timeString = "1h";
            return timeString;
        }
        if (tmp >= 576000) { // Equivalent to 1 month
            int round =  (int) (tmp/ 576000);
            timeString = timeString + round + "mo";
            tmp = tmp - round * 576000;
        }
        if (tmp >= 144000) { // Equivalent to 1 week
            int round = (int)(tmp/ 144000);
            timeString = timeString + round + "w";
            tmp = tmp - round * 144000;
        }
        if (tmp >= 28800) { // Equivalent to 1 day
            int round = (int)(tmp/ 28800);
            timeString = timeString + round + "d";
            tmp = tmp - round * 28800;
        }
        if (tmp >= 3600) { // Equivalent to 1 hour 
            int round = (int)(tmp/ 3600);
            timeString = timeString + round + "h";
            tmp = tmp - round * 3600;
        }
        return timeString;
    }

    public void setEstimate(int projectId, Issue issue, String accessToken) {
        resetTime(projectId, issue, accessToken);
        if(issue.getStoryPoint() > 0) {
            Issue[] closedIssues = dataGrabber.getClosedIssues(gitLabApiUrl, projectId, accessToken);
            dataGrabber.setDataPoints(closedIssues);
            int[][] dataPoints = dataGrabber.getDataPoints();
            this.trainModel(dataPoints);
            String estimate = this.timeConversion(this.predict(issue.getStoryPoint()));
            String uri = String.format("%1s/projects/%2s/issues/%3s/time_estimate?duration=%4s&access_token=%5s", gitLabApiUrl, projectId, issue.getIid(), estimate, accessToken);
            restTemplate.postForObject(uri, null, String.class);
        }
    }

    public void setTimeSpent(int projectId, Issue issue, String accessToken) {
        resetTime(projectId, issue, accessToken);
        String timeSpent = this.timeConversion((double) issue.getTimeSpent());
        String uri = String.format("%1s/projects/%2s/issues/%3s/add_spent_time?duration=%4s&access_token=%5s", gitLabApiUrl, projectId, issue.getIid(), timeSpent, accessToken);
        restTemplate.postForObject(uri, null, String.class);
    }

    private void resetTime(int projectId, Issue issue, String accessToken) {
        String restTimeSpent = String.format("%1s/projects/%2s/issues/%3s/reset_spent_time?&access_token=%5s", gitLabApiUrl, projectId, issue.getIid(), accessToken);
        restTemplate.postForObject(restTimeSpent, null, String.class); // resets as time spent is cumulative 
    }
}
