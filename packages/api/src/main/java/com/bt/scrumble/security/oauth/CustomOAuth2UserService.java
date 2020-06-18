package com.bt.scrumble.security.oauth;

import com.bt.scrumble.models.User;
import com.bt.scrumble.security.UserPrincipal;
import com.bt.scrumble.security.oauth.users.OAuth2UserInfo;
import com.bt.scrumble.services.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

// Adapted from
// https://github.com/callicoder/spring-boot-react-oauth2-social-login-demo/blob/master/spring-social/src/main/java/com/example/springsocial/security/oauth2/CustomOAuth2UserService.java
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

  private static final Logger LOGGER = LoggerFactory.getLogger(CustomOAuth2UserService.class);

  @Autowired private IUserService userService;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest)
      throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

    try {
      return processOAuth2User(oAuth2UserRequest, oAuth2User);
    } catch (AuthenticationException ex) {
      throw ex;
    } catch (Exception ex) {
      LOGGER.error(ex.getMessage());
      throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
    }
  }

  private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
    OAuth2UserInfo oAuth2UserInfo =
        OAuth2UserInfoFactory.getOAuth2UserInfo(
            oAuth2UserRequest.getClientRegistration().getRegistrationId(),
            oAuth2User.getAttributes());

    User user;
    Optional<User> userOptional = userService.findUserByServiceId(oAuth2UserInfo.getId());

    if (userOptional.isEmpty()) {
      user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
    } else {
      user = userOptional.get();
    }

    userService.addToken(user.getId(), oAuth2UserRequest.getAccessToken().getTokenValue());
    return UserPrincipal.create(userOptional.get(), oAuth2User.getAttributes());
  }

  private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
    User user = new User();

    user.setServiceId(oAuth2UserInfo.getId());
    user.setProviderId(oAuth2UserRequest.getClientRegistration().getRegistrationId());

    user = userService.createUser(user);
    return user;
  }
}
