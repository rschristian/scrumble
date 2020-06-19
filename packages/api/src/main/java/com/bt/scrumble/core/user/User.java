package com.bt.scrumble.core.user;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;
import java.util.ArrayList;

@Getter
@AllArgsConstructor
public class User implements Serializable {
  private final int id;
  private final String name;
  private final String username;

  @JsonAlias("avatar_url")
  private final String avatarUrl;

  private final ArrayList<Integer> projectIds;
}
