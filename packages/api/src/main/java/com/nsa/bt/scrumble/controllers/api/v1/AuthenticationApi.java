package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.security.TokenProvider;
import com.nsa.bt.scrumble.security.TokenUtils;
import com.nsa.bt.scrumble.services.ITokenService;
import com.nsa.bt.scrumble.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/authenticate")
public class AuthenticationApi {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsApi.class);

    @Autowired
    ITokenService tokenService;

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

    @GetMapping("/token/long-life")
    public ResponseEntity<Map<String, String>> exchangeShortLifeToken(HttpServletRequest request) {
        HashMap<String, String> tokenResponse = new HashMap<>();
        String jwt = tokenUtils.getJwtFromRequest(request);
        String longLifeToken = null;

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);

            Optional<User> userOptional = userService.findUserById(userId.intValue());

            if (userOptional.isPresent()){
                longLifeToken =  tokenProvider.createToken(userId.intValue(), tokenService.timeLongLifeTokenValidFor());
                tokenResponse.put("jwt", longLifeToken);
            } else {
                logger.error("User not found");
                tokenResponse.put("error", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(tokenResponse);
            }
        }

        return ResponseEntity.ok().body(tokenResponse);
    }
}
