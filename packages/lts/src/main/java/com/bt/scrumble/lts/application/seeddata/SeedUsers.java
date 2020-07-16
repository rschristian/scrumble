package com.bt.scrumble.lts.application.seeddata;

import com.bt.scrumble.lts.dto.User;

public class SeedUsers {
  private static final User user1 = new User(1, "Ryan Christian", "rChristian");
  private static final User user2 = new User(1, "Lauren Heymer", "lHeymer");
  private static final User user3 = new User(1, "James Buckland", "jBuckland");
  private static final User user4 = new User(1, "Smoke Test", "smoketester");

  public static User getUser1() {
    return user1;
  }

  public static User getUser2() {
    return user2;
  }

  public static User getUser3() {
    return user3;
  }

  public static User getUser4() {
    return user4;
  }
}
