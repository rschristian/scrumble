package com.bt.scrumble.application.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.io.Serializable;

public class ScrumbleUser implements Serializable {
  private final int id;
  private final String name;
  private final String username;

  @JsonAlias("avatar_url")
  private final String avatarUrl;

  public ScrumbleUser(int id, String name, String username, String avatarUrl) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.avatarUrl = avatarUrl;
  }

  public int getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public String getUsername() {
    return this.username;
  }

  public String getAvatarUrl() {
    return this.avatarUrl;
  }
}
