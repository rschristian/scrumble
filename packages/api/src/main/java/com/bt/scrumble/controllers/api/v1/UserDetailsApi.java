package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.dto.ScrumbleUser;
import com.bt.scrumble.dto.User;
import com.bt.scrumble.security.UserPrincipal;
import com.bt.scrumble.services.IUserService;
import io.opentracing.Span;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserDetailsApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsApi.class);

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private IUserService userService;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabBaseUrlApi;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    @GetMapping("/user/info")
    public ResponseEntity<Object> getUserInfo(Authentication authentication) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /user/info").start();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId(), span);

        if (accessTokenOptional.isPresent()) {
            String uri = String.format("%1s/users/%2s?access_token=%3s", gitLabBaseUrlApi, userPrincipal.getServiceId(), accessTokenOptional.get());
            User currentUser = restTemplate.getForObject(uri, User.class);
            span.finish();
            return ResponseEntity.ok().body(new ScrumbleUser(currentUser.getId(), currentUser.getName(), currentUser.getUsername(), currentUser.getAvatarUrl()));
        }
        LOGGER.error("Unable to authenticate with authentication provider");

        span.finish();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", authErrorMsg));
    }
}
