package com.bt.scrumble.application.data;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
public class UserData {
  private int id;
  private int serviceId;
  private String providerId;
  private String name;
  private ArrayList<Integer> projectIds;

  public UserData(int id, int serviceId, String providerId) {
    this.id = id; // A users Scrumble id
    this.serviceId =
        serviceId; // The id of that user from the authentication server e.g. a users GitLab id
    this.providerId =
        providerId; // Provider id being "gitlab" for example. Defined by in application.properties
    // e.g. spring.security.oauth2.client.registration.gitlab.client-id
  }
}
