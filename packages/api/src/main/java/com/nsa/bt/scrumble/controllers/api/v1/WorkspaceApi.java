package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.dto.IssuePageData;
import com.nsa.bt.scrumble.security.UserPrincipal;
//import com.nsa.bt.scrumble.services.ICacheService;
import com.nsa.bt.scrumble.services.IUserService;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@RestController
@RequestMapping("/api/v1/workspace")
public class WorkspaceApi {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceApi.class);

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabApiUrl;

    @Autowired
    IUserService userService;

    @Autowired
    RestTemplate restTemplate;

//    @Autowired
//    ICacheService cacheService;

    @GetMapping("/{id}/issues")
    public ResponseEntity<Object> getIssues(Authentication auth, @PathVariable(value="id") int id, @RequestParam(value="page") String page) {

//        int[] projectIds = { 1, 3, 4, 5, 8 };
        int pageNum = Integer.parseInt(page.replace("/", ""));
        int[] projectIds = { 5 };
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

        if(accessTokenOptional.isPresent()) {
            int totalProjectIssues = projectIssueStats(projectIds[0], accessTokenOptional.get());
            String uri = String.format("%s/projects/%d/issues?access_token=%s&page=%d", gitLabApiUrl, projectIds[0], accessTokenOptional.get(), pageNum);
            ResponseEntity<Issue[]> issuesResponse = restTemplate.exchange(uri, HttpMethod.GET, entity, Issue[].class);
            Issue[] issues = issuesResponse.getBody();
            var res = new HashMap<>();
            res.put("issues", issues);
            IssuePageData pageData = new IssuePageData();
            pageData.setTotal(totalProjectIssues);
            pageData.setPageSize(20);
            pageData.setNumberOfPages(totalProjectIssues/20);
            res.put("pageData", pageData);
            return ResponseEntity.ok().body(res);
        }

//        if(accessTokenOptional.isPresent()) {
//            if (!cacheService.workspaceIssuesExist(id)) {
//                for (int i = 0; i < projectIds.length; i++) { ;
//                    manageLinks(id, projectIds[i], accessTokenOptional.get());
//                }
//            }
//            return ResponseEntity.ok().body(cacheService.getAllWorkspaceIssues(id));
//        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @GetMapping
    public int projectIssueStats(int projectId, String accessToken) {
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

//    @GetMapping("/{id}/issues/cached")
//    public ResponseEntity<Object> getCachedIssues(@PathVariable(value="id") int id) {
//        return ResponseEntity.ok().body(cacheService.getAllWorkspaceIssues(id));
//    }

//    private ArrayList<Issue> manageLinks(int workspaceId, int projectId, String accessToken) {
//        boolean areMoreIssues = true;
//        String uri = String.format("%s/projects/%d/issues?access_token=%s", gitLabApiUrl, projectId, accessToken);
//
//        while (areMoreIssues) {
//            GitLabLinks links = collectIssues(uri, workspaceId);
//            if(links.getNext() != null && !links.getNext().isEmpty()) {
//                uri = links.getNext();
//            } else {
//                areMoreIssues = false;
//            }
//        }
//    }

//    private GitLabLinks collectIssues(String uri, int workspaceId) {
//        GitLabLinkParser linkParser = new GitLabLinkParser();
//        var headers = new HttpHeaders();
//        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
//        HttpEntity<String> entity = new HttpEntity<String>(headers);
//
//        ResponseEntity<Issue[]> issuesResponse = restTemplate.exchange(uri, HttpMethod.GET, entity, Issue[].class);
//        Issue[] issues = issuesResponse.getBody();
//        cacheService.addToWorkspaceIssues(workspaceId, issues);
//
//        if(issuesResponse.getHeaders().containsKey("Link")){
//            return linkParser.parseLink(issuesResponse.getHeaders().getFirst("Link"));
//        }
//        return null;
//    }
//private GitLabLinks collectIssues(String uri, int workspaceId) {
//    GitLabLinkParser linkParser = new GitLabLinkParser();
//    var headers = new HttpHeaders();
//    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
//    HttpEntity<String> entity = new HttpEntity<String>(headers);
//
//    ResponseEntity<Issue[]> issuesResponse = restTemplate.exchange(uri, HttpMethod.GET, entity, Issue[].class);
//    Issue[] issues = issuesResponse.getBody();
//    cacheService.addToWorkspaceIssues(workspaceId, issues);
//
//    if(issuesResponse.getHeaders().containsKey("Link")){
//        return linkParser.parseLink(issuesResponse.getHeaders().getFirst("Link"));
//    }
//    return null;
//}
}
