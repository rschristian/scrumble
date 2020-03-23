package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/issues")
public class IssuesApi {

    private static final Logger logger = LoggerFactory.getLogger(IssuesApi.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IUserService userService;

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabBaseUrl;

    @GetMapping("/all")
    public ResponseEntity<String> getAllIssues(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%s/issues?scope=all&access_token=%s", gitLabBaseUrl, accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.getForObject(uri, String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @PostMapping("/{projectId}/createIssue")
    public ResponseEntity<String> createIssue(Authentication authentication, @PathVariable(value="projectId") int projectId, @RequestBody Issue issue){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/projects/%2s/issues?title=%3s&description=%4s&labels=%5s&access_token=%6s", gitLabBaseUrl, projectId, issue.getTitle(), issue.getDescription(), issue.getStoryPoint(),accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.postForObject(uri, null , String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @PutMapping("/{projectId}/editIssue")
    public ResponseEntity<String> editIssue(Authentication authentication, @PathVariable(value="projectId") int projectId, @RequestBody Issue issue) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/projects/%2s/issues/%3s?title=%4s&description=%5s&labels=%6s&access_token=%7s", gitLabBaseUrl, projectId, issue.getIid(), issue.getTitle(), issue.getDescription(), issue.getStoryPoint(), accessTokenOptional.get());
            restTemplate.exchange(uri, HttpMethod.PUT, null, Void.class);
            return ResponseEntity.ok().body("issue updtaed");
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @DeleteMapping("/{projectId}/deleteIssue/{issueId}")
    public ResponseEntity<String> deleteIssue(Authentication authentication, @PathVariable(value="projectId") int projectId, @PathVariable(value="issueId") int issueId) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/projects/%2s/issues/%3s?access_token=%s", gitLabBaseUrl, projectId, issueId ,accessTokenOptional.get());
            restTemplate.exchange(uri, HttpMethod.DELETE, null, Void.class);
            return ResponseEntity.ok().body("issue updtaed");
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }
}
