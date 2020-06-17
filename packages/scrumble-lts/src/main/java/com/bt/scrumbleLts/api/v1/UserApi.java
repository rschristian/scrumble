package com.bt.scrumbleLts.api.v1;

import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.User;

@Path
public class UserApi {

    @JSON
    @GetRoute("/users/:userId")
    public User getUserInfo() {
        return new User();
    }
}
