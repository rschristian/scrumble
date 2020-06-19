package com.bt.scrumble.api.v1;

import com.bt.scrumble.core.project.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1")
public class ProjectApi {

  private final RestTemplate restTemplate;

  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabBaseUrl;

  @Autowired
  public ProjectApi(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @GetMapping("/projects")
  public ResponseEntity<Object> getProjects() {
    var headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    String uri = String.format("%s/projects", gitLabBaseUrl);
    ResponseEntity<ArrayList<Project>> userProjectsResponse =
        restTemplate.exchange(
            uri, HttpMethod.GET, new HttpEntity(headers), new ParameterizedTypeReference<>() {});
    return ResponseEntity.ok().body(userProjectsResponse.getBody());
  }
}
