package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.ICacheService;
import com.nsa.bt.scrumble.services.IUserService;
import com.nsa.bt.scrumble.util.GitLabLinkParser;
import com.nsa.bt.scrumble.util.GitLabLinks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Optional;

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

    @Autowired
    ICacheService cacheService;

    @GetMapping("/{id}/issues")
    public ResponseEntity<Object> getIssues(Authentication auth, @PathVariable(value="id") int id) {
        int[] projectIds = {1, 3, 4, 5, 8};
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

        if(accessTokenOptional.isPresent()) {
            for (int i = 0; i < projectIds.length; i++) { ;
                manageLinks(projectIds[i], accessTokenOptional.get());
            }
            return ResponseEntity.ok().body(cacheService.getAllWorkspaceIssues(9));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @GetMapping("/{id}/issues/cached")
    public ResponseEntity<Object> getCachedIssues(@PathVariable(value="id") int id) {
        return ResponseEntity.ok().body(cacheService.getAllWorkspaceIssues(id));
    }

    private void manageLinks(int projectId, String accessToken) {
        boolean areMoreIssues = true;
        String uri = String.format("%s/projects/%d/issues?access_token=%s", gitLabApiUrl, projectId, accessToken);

        while (areMoreIssues) {
            GitLabLinks links = collectIssues(uri);
            if(links.getNext() != null && !links.getNext().isEmpty()) {
                uri = links.getNext();
            } else {
                areMoreIssues = false;
            }
        }
    }

    private GitLabLinks collectIssues(String uri) {
        GitLabLinkParser linkParser = new GitLabLinkParser();
        var headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<String>(headers);

        ResponseEntity<Issue[]> issuesResponse = restTemplate.exchange(uri, HttpMethod.GET, entity, Issue[].class);
        Issue[] issues = issuesResponse.getBody();
        cacheService.addToWorkspaceIssues(9, issues);

        if(issuesResponse.getHeaders().containsKey("Link")){
            return linkParser.parseLink(issuesResponse.getHeaders().getFirst("Link"));
        }
        return null;
    }
}
