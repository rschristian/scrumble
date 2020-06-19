package com.bt.scrumble.api.v1;

import com.bt.scrumble.ScrumbleConfig;
import com.bt.scrumble.api.v1.security.TokenProvider;
import com.bt.scrumble.api.v1.security.TokenUtils;
import com.bt.scrumble.api.v1.security.UserPrincipal;
import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.user.UserService;
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

  private final ScrumbleConfig appProperties;
  private final TokenProvider tokenProvider;
  private final TokenUtils tokenUtils;
  private final UserService userService;

  @Autowired
  public AuthenticationApi(ScrumbleConfig appProperties, TokenProvider tokenProvider,
                           TokenUtils tokenUtils, UserService userService) {
    this.appProperties = appProperties;
    this.tokenProvider = tokenProvider;
    this.tokenUtils = tokenUtils;
    this.userService = userService;
  }

  @GetMapping("/auth/token")
  public ResponseEntity<Object> exchangeShortLifeToken(HttpServletRequest request) {
    String jwt = tokenUtils.getJwtFromRequest(request);
    String token = "";

    if (StringUtils.hasText(jwt)) {
      Long userId = tokenProvider.getUserIdFromToken(jwt);
      Optional<UserData> userOptional = userService.findUserById(userId.intValue());

      if (userOptional.isEmpty()) {
        LOGGER.error("UserData not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("message", "UserData not found"));
      }
      token =
          tokenProvider.createToken(
              userId.intValue(), appProperties.getAuth().getLongLifeTokenExpirationMsec());
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
