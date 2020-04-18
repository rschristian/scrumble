package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Project;
import com.nsa.bt.scrumble.security.UserPrincipal;
import com.nsa.bt.scrumble.services.IUserService;

import io.opentracing.Span;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ProjectApi {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    IUserService userService;

    @Value("${app.issues.provider.gitlab.baseUrl.api}")
    private String gitLabBaseUrl;

    @Value("${app.msg.error.auth}")
    private String authErrorMsg;

    @GetMapping("/projects")
    public ResponseEntity<Object> getIssues(Authentication auth) {
        Span span = ApiTracer.getTracer().buildSpan("HTTP GET /projects").start();
        var headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        var jsonHeaders = new HttpEntity(headers);

        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId(), span);
        if(accessTokenOptional.isPresent()) {
            String uri = String.format("%s/projects?access_token=%s&simple=true&membership=true",
                    gitLabBaseUrl, accessTokenOptional.get());
            ResponseEntity<ArrayList<Project>> userProjectsResponse =
                    restTemplate.exchange(uri, HttpMethod.GET, jsonHeaders, new ParameterizedTypeReference<>() {});
            span.finish();
            return ResponseEntity.ok().body(userProjectsResponse.getBody());
        }
        span.finish();
        return ResponseEntity.ok().body(authErrorMsg);
    }
}
