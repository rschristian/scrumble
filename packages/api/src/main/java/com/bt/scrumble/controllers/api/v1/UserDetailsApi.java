package com.bt.scrumble.controllers.api.v1;

import com.bt.scrumble.dto.ScrumbleUser;
import com.bt.scrumble.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1")
public class UserDetailsApi {

  private final RestTemplate restTemplate;
  @Value("${app.issues.provider.gitlab.baseUrl.api}")
  private String gitLabBaseUrlApi;

  @Autowired
  public UserDetailsApi(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @GetMapping("/user/info")
  public ResponseEntity<Object> getUserInfo() {
    String uri = String.format("%1s/users", gitLabBaseUrlApi);
    User currentUser = restTemplate.getForObject(uri, User.class);
    return ResponseEntity.ok()
        .body(
            new ScrumbleUser(
                currentUser.getId(),
                currentUser.getName(),
                currentUser.getUsername(),
                currentUser.getAvatarUrl()));
  }
}
