package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.config.AppProperties;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.security.TokenProvider;
import com.nsa.bt.scrumble.security.TokenUtils;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationApi {

    public AuthenticationApi (AppProperties appProperties) {
        this.appProperties = appProperties;
    }
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsApi.class);
    private AppProperties appProperties;

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    IUserService userService;

    @Autowired
    TokenUtils tokenUtils;

    @GetMapping("/token")
    public ResponseEntity<Object> exchangeShortLifeToken(HttpServletRequest request) {
        var tokenResponse = new HashMap<>();
        String jwt = tokenUtils.getJwtFromRequest(request);
        String longLifeToken = null;

        if (StringUtils.hasText(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);
            Optional<User> userOptional = userService.findUserById(userId.intValue());

            if (userOptional.isPresent()){
                longLifeToken =  tokenProvider.createToken(userId.intValue(), appProperties.getAuth().getLongLifeTokenExpirationMsec());
                tokenResponse.put("jwt", longLifeToken);
            } else {
                logger.error("User not found");
                tokenResponse.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tokenResponse);
            }
        }

        return ResponseEntity.ok().body(tokenResponse);
    }

    @DeleteMapping("/token")
    public ResponseEntity<Object> deleteToken(Authentication authentication) {
        var deleteTokenResponse = new HashMap<>();

        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            userService.removeToken(userPrincipal.getId());
            deleteTokenResponse.put("success", true);

            return ResponseEntity.ok().body(deleteTokenResponse);
        } catch (InternalAuthenticationServiceException exception) {
            return ResponseEntity.ok().body(deleteTokenResponse);
        }
    }
}
