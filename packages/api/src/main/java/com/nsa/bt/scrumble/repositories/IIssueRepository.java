package com.nsa.bt.scrumble.repositories;

public interface IIssueRepository {
    void updateStartDate(int issueId, int projectId);

    void updateDueDate(int issueId, int projectId);

    void removeIssue(int issueId, int projectId);

    void removeDueDate(int issueId, int projectId);

    Integer calculateTime(int issueId, int projectId);

}