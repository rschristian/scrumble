package com.nsa.bt.scrumble.security.oauth;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationError extends AuthenticationException {
    public OAuth2AuthenticationError(String msg, Throwable t) {
        super(msg, t);
    }

    public OAuth2AuthenticationError(String msg) {
        super(msg);
    }
}
