package com.bt.scrumble.core.issue;

public interface IssueRepository {
  void updateStartTime(int issueId, int projectId);

  void updateEndTime(int issueId, int projectId);

  void removeIssue(int issueId, int projectId);

  void removeEndTime(int issueId, int projectId);

  Integer calculateTime(int issueId, int projectId);
}
