package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
public class UserDetailsApi {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsApi.class);

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IUserService userService;

    @Value("${app.issues.provider.gitlab.baseUrl}")
    private String gitLabBaseUrl;

    @Value("${app.issues.providers.gitlab.baseUrl.api}")
    private String gitLabApiUrl;


    @GetMapping("/info")
    public ResponseEntity<String> getUserInfo(Authentication authentication){
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%s/oauth/userinfo?access_token=%s", gitLabBaseUrl, accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.getForObject(uri, String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }

    @GetMapping("/issues")
    public ResponseEntity<Object> getIssues(Authentication auth) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%s/api/v4/projects/4/issues?access_token=%s", gitLabApiUrl, accessTokenOptional.get());
            return ResponseEntity.ok().body(restTemplate.getForObject(uri, String.class));
        }
        logger.error("Unable to authenticate with authentication provider");
        return ResponseEntity.ok().body("Something went wrong...");
    }
}
