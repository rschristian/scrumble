package com.bt.scrumble.lts.api;

import com.blade.mvc.annotation.GetRoute;
import com.blade.mvc.annotation.JSON;
import com.blade.mvc.annotation.Path;
import com.blade.mvc.annotation.PathParam;
import com.bt.scrumble.lts.application.seeddata.SeedProjects;
import com.bt.scrumble.lts.dto.Project;

import java.lang.reflect.Array;
import java.util.Arrays;

@Path
public class ProjectApi {
  @JSON
  @GetRoute("/projects")
  public Project[] getProjects() {
    return SeedProjects.getProjects();
  }

  @JSON
  @GetRoute("/projects/:projectId")
  public Project getProject(@PathParam Integer projectId) {
    return SeedProjects.getProjects()[projectId -1];
  }
}
