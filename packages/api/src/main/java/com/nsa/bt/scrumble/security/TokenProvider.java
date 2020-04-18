package com.nsa.bt.scrumble.security;

import com.nsa.bt.scrumble.config.AppProperties;
import io.jsonwebtoken.*;
import io.opentracing.Span;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.authentication.www.NonceExpiredException;
import org.springframework.stereotype.Service;

import java.util.Date;

// Adapted from https://github.com/callicoder/spring-boot-react-oauth2-social-login-demo/blob/master/spring-social/src/main/java/com/example/springsocial/security/TokenAuthenticationFilter.java
@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final AppProperties appProperties;

    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String createToken(int userId, long validFor, Span span) {
        span = SecurityTracer.getTracer().buildSpan("Create a new JWT").asChildOf(span).start();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validFor);
        var token = Jwts.builder()
                .setSubject(Long.toString(userId))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
        span.finish();
        return token;
    }

    public Long getUserIdFromToken(String token, Span span) {
        span = SecurityTracer.getTracer().buildSpan("Return User ID from Token").asChildOf(span).start();
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();
        var userId = Long.parseLong(claims.getSubject());
        span.finish();
        return userId;
    }

    public boolean isValidToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (NonceExpiredException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }

}

