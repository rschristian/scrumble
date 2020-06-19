package com.bt.scrumble.api.v1;

import com.bt.scrumble.api.v1.security.UserPrincipal;
import com.bt.scrumble.core.user.ScrumbleUser;
import com.bt.scrumble.core.user.User;
import com.bt.scrumble.core.user.UserService;
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
  private final RestTemplate restTemplate;
  private final UserService userService;
  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabBaseUrlApi;
  @Value("${app.msg.error.auth}")
  private String authErrorMsg;

  @Autowired
  public UserDetailsApi(RestTemplate restTemplate, UserService userService) {
    this.restTemplate = restTemplate;
    this.userService = userService;
  }

  @GetMapping("/user/info")
  public ResponseEntity<Object> getUserInfo(Authentication authentication) {
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());

    if (accessTokenOptional.isPresent()) {
      String uri =
          String.format(
              "%1s/users/%2s?access_token=%3s",
              gitLabBaseUrlApi, userPrincipal.getServiceId(), accessTokenOptional.get());
      User currentUser = restTemplate.getForObject(uri, User.class);
      return ResponseEntity.ok()
          .body(
              new ScrumbleUser(
                  currentUser.getId(),
                  currentUser.getName(),
                  currentUser.getUsername(),
                  currentUser.getAvatarUrl()));
    }
    LOGGER.error("Unable to authenticate with authentication provider");
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", authErrorMsg));
  }
}
