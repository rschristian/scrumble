package com.bt.scrumbleLts.api.v1;

import com.blade.mvc.RouteContext;
import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.User;

@Path
public class UserApi {

    @JSON
    @GetRoute("/users/:userId")
    public User getUserInfo(RouteContext ctx, @PathParam Integer userId, @Param String access_token) {
        return new User();
    }
}
