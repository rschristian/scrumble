package com.bt.scrumble.api.v1;

import com.bt.scrumble.api.v1.security.UserPrincipal;
import com.bt.scrumble.core.project.Project;
import com.bt.scrumble.core.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class ProjectApi {

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabBaseUrl;

  @Value("${app.msg.error.auth}")
  private String authErrorMsg;

  private final UserService userService;
  private final RestTemplate restTemplate;

  @Autowired
  public ProjectApi(UserService userService, RestTemplate restTemplate) {
    this.userService = userService;
    this.restTemplate = restTemplate;
  }

  @GetMapping("/projects")
  public ResponseEntity<Object> getIssues(Authentication auth) {

    UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
    Optional<String> accessTokenOptional = userService.getToken(userPrincipal.getId());
    if (accessTokenOptional.isPresent()) {
      var headers = new HttpHeaders();
      headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
      String uri =
          String.format(
              "%s/projects?access_token=%s&simple=true&membership=true",
              gitLabBaseUrl, accessTokenOptional.get());
      ResponseEntity<ArrayList<Project>> userProjectsResponse =
          restTemplate.exchange(
              uri, HttpMethod.GET, new HttpEntity(headers), new ParameterizedTypeReference<>() { });
      return ResponseEntity.ok().body(userProjectsResponse.getBody());
    }
    return ResponseEntity.ok().body(authErrorMsg);
  }
}
