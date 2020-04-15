package com.nsa.bt.scrumble.repositories;

public interface IIssueRepository {
    void updateStartDate(int issueId);

    void updateDueDate(int issueId);

    void removeIssue(int issueId);

    void removeDueDate(int issueId);

    Integer calculateTime(int issueId);

}