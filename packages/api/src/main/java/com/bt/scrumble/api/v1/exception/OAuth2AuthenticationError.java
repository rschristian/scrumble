package com.bt.scrumble.api.v1.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationError extends AuthenticationException {
  public OAuth2AuthenticationError(String msg) {
    super(msg);
  }
}
