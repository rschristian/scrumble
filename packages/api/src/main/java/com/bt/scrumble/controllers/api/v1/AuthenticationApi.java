package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.config.AppProperties;
import com.bt.scrumble.models.User;
import com.bt.scrumble.security.TokenProvider;
import com.bt.scrumble.security.TokenUtils;
import com.bt.scrumble.security.UserPrincipal;
import com.bt.scrumble.services.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsApi.class);
    private final AppProperties appProperties;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private IUserService userService;
    @Autowired
    private TokenUtils tokenUtils;

    public AuthenticationApi(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @GetMapping("/auth/token")
    public ResponseEntity<Object> exchangeShortLifeToken(HttpServletRequest request) {
        String jwt = tokenUtils.getJwtFromRequest(request);
        String token = "";

        if (StringUtils.hasText(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);
            Optional<User> userOptional = userService.findUserById(userId.intValue());

            if (userOptional.isEmpty()) {
                LOGGER.error("User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
            }
            token = tokenProvider.createToken(userId.intValue(), appProperties.getAuth().getLongLifeTokenExpirationMsec());
        }
        return ResponseEntity.ok().body(Map.of("jwt", token));
    }

    @DeleteMapping("/auth/token")
    public ResponseEntity<Object> deleteToken(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            userService.removeToken(userPrincipal.getId());
            return ResponseEntity.ok().body(null);
        } catch (InternalAuthenticationServiceException exception) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
