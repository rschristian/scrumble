package com.bt.scrumble.api.v1.security;

import com.bt.scrumble.api.v1.security.oauth.CustomOAuth2UserService;
import com.bt.scrumble.api.v1.security.oauth.HttpCookieOAuth2AuthorizationRequestRepository;
import com.bt.scrumble.api.v1.security.oauth.OAuth2AuthFailureHandler;
import com.bt.scrumble.api.v1.security.oauth.OAuth2AuthSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final CustomOAuth2UserService customOAuth2UserService;
  private final OAuth2AuthFailureHandler oAuth2AuthFailureHandler;
  private final OAuth2AuthSuccessHandler oAuth2AuthSuccessHandler;

  @Autowired
  public WebSecurityConfig(CustomOAuth2UserService customOAuth2UserService,
                           OAuth2AuthFailureHandler oAuth2AuthFailureHandler,
                           OAuth2AuthSuccessHandler oAuth2AuthSuccessHandler) {
    this.customOAuth2UserService = customOAuth2UserService;
    this.oAuth2AuthFailureHandler = oAuth2AuthFailureHandler;
    this.oAuth2AuthSuccessHandler = oAuth2AuthSuccessHandler;
  }

  @Bean
  public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
    return new HttpCookieOAuth2AuthorizationRequestRepository();
  }

  @Bean
  public TokenAuthenticationFilter tokenAuthenticationFilter() {
    return new TokenAuthenticationFilter();
  }

  @Override
  protected void configure(final HttpSecurity http) throws Exception {
    http.csrf()
        .disable()
        .cors()
        .and()
        .authorizeRequests()
        .anyRequest()
        .authenticated()
        .and()
        .formLogin()
        .disable()
        .httpBasic()
        .disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .oauth2Login()
        .redirectionEndpoint()
        .baseUri("/api/login/oauth2/code")
        .and()
        .authorizationEndpoint()
        .baseUri("/api/oauth2/authorize")
        .authorizationRequestRepository(cookieAuthorizationRequestRepository())
        .and()
        .redirectionEndpoint()
        .baseUri("/api/login/oauth2/code")
        .and()
        .userInfoEndpoint()
        .userService(customOAuth2UserService)
        .and()
        .successHandler(oAuth2AuthSuccessHandler)
        .failureHandler(oAuth2AuthFailureHandler);

    // Add our custom Token based authentication filter
    http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }
}
