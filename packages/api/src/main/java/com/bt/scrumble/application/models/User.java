package com.bt.scrumble.application.models;

import java.util.ArrayList;

public class User {
  private int id;
  private int serviceId;
  private String providerId;
  private String name;
  private ArrayList<Integer> projectIds;

  public User() { }

  public User(int id, int serviceId, String providerId) {
    // A users Scrumble id
    this.id = id;
    // The id of that user from the authentication server e.g. a users GitLab id
    this.serviceId = serviceId;
    // Provider id being "gitlab" for example. Defined by in application.properties
    // e.g. spring.security.oauth2.client.registration.gitlab.client-id
    this.providerId = providerId;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getServiceId() {
    return serviceId;
  }

  public void setServiceId(int serviceId) {
    this.serviceId = serviceId;
  }

  public String getProviderId() {
    return providerId;
  }

  public void setProviderId(String providerId) {
    this.providerId = providerId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public ArrayList<Integer> getProjectIds() {
    return projectIds;
  }

  public void setProjectIds(ArrayList<Integer> projectIds) {
    this.projectIds = projectIds;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    } else if (obj == null || getClass() != obj.getClass()) {
      return false;
    }
    User other = (User) obj;
    return id == other.id;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + id;
    return result;
  }
}
