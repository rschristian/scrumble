package com.bt.scrumble.services;

import com.bt.scrumble.dto.Issue;

public interface IUserService {
  void setProjectId(int workspaceId, Issue issue);
}
