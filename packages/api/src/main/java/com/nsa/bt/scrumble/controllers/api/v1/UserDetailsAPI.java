package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.config.GitLabOAuth2User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/v1")
public class UserDetailsAPI {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsAPI.class);

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/user/info")
    public ResponseEntity<GitLabOAuth2User> getUserInfo(Authentication authentication){
        OAuth2AuthorizedClient auth2AuthorizedClient =
                this.auth2AuthorizedClientService.loadAuthorizedClient("gitlab", authentication.getName());

        String accessToken = auth2AuthorizedClient.getAccessToken().getTokenValue();
        String uri = String.format("http://localhost/oauth/userinfo?access_token=%s", accessToken);

        logger.info(uri);

        String result = restTemplate.getForObject(uri, String.class);

        GitLabOAuth2User user = (GitLabOAuth2User) authentication.getPrincipal();

        logger.info(result);
        logger.info(user.getName());

        return ResponseEntity.ok().body(user);

    }
}
