package com.bt.scrumble.lts.api;

import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.annotation.PathParam;
import com.bt.scrumble.lts.dto.Project;

import java.lang.reflect.Array;
import java.util.Arrays;

@Path
public class ProjectApi {

  private Project[] getProjectSeedData() {
    return new Project[] {
        new Project(1, "Tempest", "Email Client built using Rocket and PreactJS"),
        new Project(
            2,
            "Monmouthshire IoT",
            "3rd Year University Client Project: React, Express, and a Raspberry Pi"),
        new Project(
            3,
            "Preact GitHub Calendar",
            "Preact Component that Displays a User's GitHub Contribution Calendar"),
        new Project(
            4,
            "TS API Toolkit",
            "A simple wrapper around Axios in combination with Json Web Token Handling to easily communicate with an API, with or without authorization."),
        new Project(5, "Preact-CLI", "Your next Preact PWA starts in 30 seconds")
    };
  }

  @JSON
  @GetRoute("/projects")
  public Project[] getProjects() {
    return getProjectSeedData();
  }

  @JSON
  @GetRoute("/projects/:projectId")
  public Project getProject(@PathParam Integer projectId) {
    return getProjectSeedData()[projectId -1];
  }
}
