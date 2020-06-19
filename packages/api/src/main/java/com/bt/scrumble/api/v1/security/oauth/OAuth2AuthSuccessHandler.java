package com.bt.scrumble.api.v1.security.oauth;

import com.bt.scrumble.ScrumbleConfig;
import com.bt.scrumble.api.v1.exception.BadRequestException;
import com.bt.scrumble.api.v1.security.CookieUtils;
import com.bt.scrumble.api.v1.security.TokenProvider;
import com.bt.scrumble.api.v1.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

import static com.bt.scrumble.api.v1.security.oauth.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

// Adapted from
// https://github.com/callicoder/spring-boot-react-oauth2-social-login-demo/blob/master/spring-social/src/main/java/com/example/springsocial/security/oauth2/OAuth2AuthenticationSuccessHandler.java

@Component
public class OAuth2AuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final TokenProvider tokenProvider;

  private final ScrumbleConfig appProperties;

  private final HttpCookieOAuth2AuthorizationRequestRepository
      httpCookieOAuth2AuthorizationRequestRepository;

  @Autowired
  OAuth2AuthSuccessHandler(
      TokenProvider tokenProvider,
      ScrumbleConfig appProperties,
      HttpCookieOAuth2AuthorizationRequestRepository
          httpCookieOAuth2AuthorizationRequestRepository) {
    this.tokenProvider = tokenProvider;
    this.appProperties = appProperties;
    this.httpCookieOAuth2AuthorizationRequestRepository =
        httpCookieOAuth2AuthorizationRequestRepository;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException, ServletException {
    String targetUrl = determineTargetUrl(request, authentication);

    if (response.isCommitted()) {
      logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
      return;
    }

    clearAuthenticationAttributes(request, response);
    getRedirectStrategy().sendRedirect(request, response, targetUrl);
  }

  protected String determineTargetUrl(HttpServletRequest request, Authentication authentication) {
    Optional<String> redirectUri =
        CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);

    if (redirectUri.isPresent()) {
      throw new BadRequestException(
          "Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
    }

    String targetUrl = redirectUri.orElse(appProperties.getAuth().getRedirectUri());

    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    String token =
        tokenProvider.createToken(
            userPrincipal.getId(), appProperties.getAuth().getShortLifeTokenExpirationMsec());

    return UriComponentsBuilder.fromUriString(targetUrl)
        .queryParam("token", token)
        .build()
        .toUriString();
  }

  protected void clearAuthenticationAttributes(
      HttpServletRequest request, HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);
    httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(
        request, response);
  }
}
