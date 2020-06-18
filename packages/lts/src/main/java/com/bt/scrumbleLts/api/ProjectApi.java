package com.bt.scrumbleLts.api;

import com.blade.mvc.annotation.*;
import com.bt.scrumbleLts.dto.Project;

@Path
public class ProjectApi {

    @JSON
    @GetRoute("/projects")
    public Project[] getProjects() {
        return new Project[]{
                new Project(1, "Email Client built using Rocket and PreactJS", "Tempest"),
                new Project(2, "3rd Year University Client Project: React, Express, and a Raspberry Pi", "Monmouthshire IoT"),
                new Project(3, "Preact Component that Displays a User's GitHub Contribution Calendar", "Preact GitHub Calendar"),
                new Project(4, "A simple wrapper around Axios in combination with Json Web Token Handling to easily communicate with an API, with or without authorization.", "TS API Toolkit"),
                new Project(5, "Your next Preact PWA starts in 30 seconds. ", "Preact-CLI")
        };
    }
}
