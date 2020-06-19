package com.bt.scrumble.core.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class ScrumbleUser implements Serializable {
  private int id;
  private String name;
  private String username;
  @JsonAlias("avatar_url")
  private String avatarUrl;
}
