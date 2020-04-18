package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.config.AppProperties;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.security.TokenProvider;
import com.nsa.bt.scrumble.security.TokenUtils;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;

import io.opentracing.Span;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationApi {

    public AuthenticationApi(final AppProperties appProperties) {
        this.appProperties = appProperties;
    }
    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsApi.class);
    private final AppProperties appProperties;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private IUserService userService;

    @Autowired
    private TokenUtils tokenUtils;

    @GetMapping("/auth/token")
    public ResponseEntity<Object> exchangeShortLifeToken(final HttpServletRequest request) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /auth/token").start();
        String jwt = tokenUtils.getJwtFromRequest(request, span);
        String token = "";

        if (StringUtils.hasText(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt, span);
            Optional<User> userOptional = userService.findUserById(userId.intValue(), span);

            if (userOptional.isEmpty()) {
                LOGGER.error("User not found");
                span.finish();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
            }
            token = tokenProvider.createToken(userId.intValue(), appProperties.getAuth().getLongLifeTokenExpirationMsec(), span);
        }
        span.finish();
        return ResponseEntity.ok().body(Map.of("jwt", token));
    }

    @DeleteMapping("/auth/token")
    public ResponseEntity<Object> deleteToken(final Authentication authentication) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP DELETE /auth/token").start();

        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            userService.removeToken(userPrincipal.getId(), span);
            span.finish();

            return ResponseEntity.ok().body(null);
        } catch (InternalAuthenticationServiceException exception) {
            span.finish();
            return ResponseEntity.status(500).body(null);
        }
    }
}
