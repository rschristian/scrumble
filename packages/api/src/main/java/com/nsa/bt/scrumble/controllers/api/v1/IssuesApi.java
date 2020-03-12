package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getIssue(@PathVariable(value="id") int id) {
        Issue issue = new Issue(id, "An issue name", "An issue description", 8, "Phoenix Project");

        return ResponseEntity.ok().body(issue);
    }
    @GetMapping("/all")
    public ResponseEntity<String> getAllIssues(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("http://10.72.98.102/api/v4/issues?access_token=%s", accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.getForObject(uri, String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

}
