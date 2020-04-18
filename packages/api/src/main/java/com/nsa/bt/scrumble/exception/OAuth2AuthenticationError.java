package com.nsa.bt.scrumble.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationError extends AuthenticationException {
    public OAuth2AuthenticationError(final String msg) {
        super(msg);
    }
}
