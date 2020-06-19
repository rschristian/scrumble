package com.bt.scrumbleLts.api;

import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Path;
import com.bt.scrumbleLts.dto.User;

@Path
public class UserApi {

  @JSON
  @GetRoute("/users")
  public User getUserInfo() {
    return new User();
  }
}
