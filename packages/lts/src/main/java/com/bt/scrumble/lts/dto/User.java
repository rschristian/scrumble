package com.bt.scrumble.lts.dto;

public class User {
  private final int id;
  private final String name;
  private final String username;
  private final String avatar_url;

  public User(int id, String name, String username) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.avatar_url =
        "https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61?s=46&d=identicon";
  }
}
