package com.nsa.bt.scrumble.controllers.api.v1.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthAdvice {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthAdvice.class);

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<String> handleAccessDeniedException(final AccessDeniedException e) {
        return error(e);
    }

    private ResponseEntity<String> error(final Exception e) {
        LOGGER.error(e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
