package com.nsa.bt.scrumble.controllers.api.v1.advice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class AuthAdvice {

    private static final Logger logger = LoggerFactory.getLogger(AuthAdvice.class);

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException e) {
        return error(FORBIDDEN, e);
    }

    private ResponseEntity<String> error(HttpStatus status, Exception e) {
        logger.error(e.getMessage());
        return ResponseEntity.status(status).body(e.getMessage());
    }
}