package com.bt.scrumble.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
  private final Auth auth = new Auth();
  private final OAuth2 oauth2 = new OAuth2();

  public Auth getAuth() {
    return auth;
  }

  public OAuth2 getOauth2() {
    return oauth2;
  }

  public static class Auth {
    private String tokenSecret;
    private long longLifeTokenExpirationMsec;
    private long shortLifeTokenExpirationMsec;
    private String redirectUri;

    public String getTokenSecret() {
      return tokenSecret;
    }

    public void setTokenSecret(String tokenSecret) {
      this.tokenSecret = tokenSecret;
    }

    public long getLongLifeTokenExpirationMsec() {
      return longLifeTokenExpirationMsec;
    }

    public void setLongLifeTokenExpirationMsec(long tokenExpirationMsec) {
      this.longLifeTokenExpirationMsec = tokenExpirationMsec;
    }

    public String getRedirectUri() {
      return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
      this.redirectUri = redirectUri;
    }

    public long getShortLifeTokenExpirationMsec() {
      return shortLifeTokenExpirationMsec;
    }

    public void setShortLifeTokenExpirationMsec(long tokenExpirationMsec) {
      this.shortLifeTokenExpirationMsec = tokenExpirationMsec;
    }
  }

  public static final class OAuth2 {
    private List<String> authorizedRedirectUris = new ArrayList<>();

    public List<String> getAuthorizedRedirectUris() {
      return authorizedRedirectUris;
    }

    public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
      this.authorizedRedirectUris = authorizedRedirectUris;
      return this;
    }
  }
}
