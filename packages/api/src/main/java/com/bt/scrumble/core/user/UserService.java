package com.bt.scrumble.core.user;

import com.bt.scrumble.core.issue.Issue;

public interface UserService {
  void setProjectId(int workspaceId, Issue issue);
}
