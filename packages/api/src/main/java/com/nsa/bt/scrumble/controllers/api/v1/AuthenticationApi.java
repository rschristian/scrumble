package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.models.User;
<<<<<<< HEAD
import com.nsa.bt.scrumble.security.TokenProvider;
import com.nsa.bt.scrumble.security.TokenUtils;
import com.nsa.bt.scrumble.services.IUserService;
=======
import com.nsa.bt.scrumble.repositories.IUserRepository;
import com.nsa.bt.scrumble.security.TokenProvider;
import com.nsa.bt.scrumble.models.JwtToken;
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
<<<<<<< HEAD
=======
import org.springframework.security.oauth2.provider.OAuth2Authentication;
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
<<<<<<< HEAD
import java.util.HashMap;
import java.util.Map;
=======
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/authenticate")
public class AuthenticationApi {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsApi.class);

    @Autowired
    OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
<<<<<<< HEAD
    IUserService userService;

    @Autowired
    TokenUtils tokenUtils;
=======
    IUserRepository userRepository;

    @GetMapping("/user/info")
    public ResponseEntity<String> getUserInfo(Authentication authentication, Principal principal){
        OAuth2AuthorizedClient auth2AuthorizedClient =
                this.auth2AuthorizedClientService.loadAuthorizedClient("gitlab", authentication.getName());
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.

    @GetMapping("/token/long-life")
    public ResponseEntity<Map<String, String>> exchangeShortLifeToken(HttpServletRequest request) {
        HashMap<String, String> tokenResponse = new HashMap<>();
        String jwt = tokenUtils.getJwtFromRequest(request);
        String longLifeToken = null;

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);

            Optional<User> userOptional = userService.findUserById(userId.intValue());

            if (userOptional.isPresent()){
                longLifeToken =  tokenProvider.createToken(userId.intValue());
                tokenResponse.put("jwt", jwt);
            } else {
                logger.error("User not found");
                tokenResponse.put("error", "User not found");
            }
        }

        return ResponseEntity.ok().body(tokenResponse);
    }

    @GetMapping("/token/long-life")
    public ResponseEntity<JwtToken> exchangeShortLifeToken(HttpServletRequest request, HttpServletResponse response){
        logger.info("IN /TOKEN/LONG-LIFE");
        String jwt = getJwtFromRequest(request);
        logger.info("jwt token: " + jwt);
        JwtToken longLifeToken = null;

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);

            Optional<User> userOptional = userRepository.findUserById(userId.intValue());

            if(userOptional.isPresent()){
                longLifeToken =  new JwtToken(tokenProvider.createToken(userId.intValue()));
            }
        }

        return ResponseEntity.ok().body(longLifeToken);
    }


    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
