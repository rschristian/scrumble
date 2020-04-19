package com.nsa.bt.scrumble.security;

import io.opentracing.Span;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

@Component
public class TokenUtils {

    public String getJwtFromRequest(HttpServletRequest request, Span parentSpan) {
        var span = SecurityTracer.getTracer().buildSpan("Get JWT from HTTP Request").asChildOf(parentSpan).start();
        String bearerToken = request.getHeader("Authorization");
        String token = (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer "))
                ? bearerToken.substring(7)
                : null;
        span.finish();
        return token;
    }
}
