package com.nsa.bt.scrumble.config;

import com.nsa.bt.scrumble.security.TokenAuthenticationFilter;
import com.nsa.bt.scrumble.security.oauth.CustomOAuth2UserService;
import com.nsa.bt.scrumble.security.oauth.HttpCookieOAuth2AuthorizationRequestRepository;
import com.nsa.bt.scrumble.security.oauth.OAuth2AuthFailureHandler;
import com.nsa.bt.scrumble.security.oauth.OAuth2AuthSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
<<<<<<< HEAD
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
=======
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.

@Configuration
//@Order(1)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2AuthSuccessHandler oAuth2AuthSuccessHandler;

    @Autowired
    private OAuth2AuthFailureHandler oAuth2AuthFailureHandler;

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

<<<<<<< HEAD
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

=======
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthSuccessHandler)
                .failureHandler(oAuth2AuthFailureHandler);

<<<<<<< HEAD
        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
=======
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.
    }
}
