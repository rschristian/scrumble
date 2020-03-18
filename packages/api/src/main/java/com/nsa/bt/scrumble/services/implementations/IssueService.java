package com.nsa.bt.scrumble.services.implementations;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageData;
import com.nsa.bt.scrumble.dto.IssuePageLink;
import com.nsa.bt.scrumble.dto.ProjectPageData;
import com.nsa.bt.scrumble.services.IIssueService;
import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;

@Service
public class IssueService implements IIssueService {

    private static final Logger logger = LoggerFactory.getLogger(IIssueService.class);
    private static final int ISSUE_PAGE_SIZE = 20;
    private ArrayList<ProjectPageData> projectPageData = new ArrayList<ProjectPageData>();

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    RestTemplate restTemplate;

    @Override
    public Object getIssuesPage(int workspaceId, int[] projectIds, String accessToken, int pageNum) {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        this.projectPageData = getProjectStats(projectIds, accessToken, ISSUE_PAGE_SIZE);

        int totalProjectIssues = projectIssueStats(projectIds[0], accessToken);
        String uri = String.format("%s/projects/%d/issues?access_token=%s&page=%d", gitLabApiUrl, projectIds[0], accessToken, pageNum);
        ResponseEntity<Issue[]> issuesResponse = restTemplate.exchange(uri, HttpMethod.GET, entity, Issue[].class);
        Issue[] issues = issuesResponse.getBody();

        var res = new HashMap<>();
        res.put("issues", issues);

        IssuePageData pageData = new IssuePageData();
        pageData.setTotal(totalProjectIssues);
        pageData.setPageSize(20);
        pageData.setNumberOfPages(totalProjectIssues/20);

        res.put("pageData", pageData);
        return res;
    }

    private int projectIssueStats(int projectId, String accessToken) {
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        String uri = String.format("%s/projects/%d/issues_statistics?access_token=%s", gitLabApiUrl, projectId, accessToken);
//        ResponseEntity<IssueStatistics> issuesStatistics = restTemplate.exchange(uri, HttpMethod.GET, entity, IssueStatistics.class);
//        IssueStatistics stats = issuesStatistics.getBody();
//        logger.info(String.format("Total Issues: %d", stats.getTotal()));

        JSONObject res = restTemplate.getForObject(uri, JSONObject.class);
        var allVar = ((LinkedHashMap) ((LinkedHashMap) res.get("statistics")).get("counts")).get("all");
        int all = Integer.parseInt(allVar.toString());
        logger.info(String.format("Total Issues: %s", all));
        return all;
    }

    private ArrayList<ProjectPageData> getProjectStats(int[] projectIds, String accessToken, int pageSize) {
        var projectPageData = new ArrayList<ProjectPageData>();
        for (int i = 0; i < projectIds.length; i++) {
            ProjectPageData pageData = new ProjectPageData();
            pageData.setProjectId(projectIds[i]);
            pageData.setNumberOfIssues(projectIssueStats(projectIds[i], accessToken));
            if (i == 0) {
                pageData.setFirstPageSize(pageSize);
                pageData.setLastPageSize(pageData.getNumberOfIssues() % pageSize);
                pageData.setNumberOfPages(calculateNumberOfPages(pageData, pageData.getNumberOfIssues(), pageSize));
            } else {
                pageData.setFirstPageSize(pageSize - projectPageData.get(i-1).getLastPageSize());
                pageData.setNumberOfPages(calculateNumberOfPages(pageData, (pageData.getNumberOfIssues() - pageData.getFirstPageSize()) , pageSize) + 1);
                pageData.setLastPageSize((pageData.getNumberOfIssues() - pageData.getFirstPageSize()) % pageSize );
            }
            projectPageData.add(pageData);
        }
        for(ProjectPageData pageData : projectPageData) {
            logger.info(pageData.toString());
        }
        return null;
    }

    private int calculateNumberOfPages(ProjectPageData pageData, int numberOfIssues, int pageSize) {
        int numberOfPages = numberOfIssues / pageSize;
        if (pageData.getNumberOfIssues() % pageSize != 0) {
            numberOfPages++;
        }
        return numberOfPages;
    }
}
