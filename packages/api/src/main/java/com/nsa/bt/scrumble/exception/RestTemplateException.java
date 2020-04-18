package com.nsa.bt.scrumble.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RestTemplateException extends RuntimeException {
    public RestTemplateException(final String message) {
        super(message);
    }
}
