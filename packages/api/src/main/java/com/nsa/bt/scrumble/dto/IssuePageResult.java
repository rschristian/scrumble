package com.nsa.bt.scrumble.dto;

import java.util.ArrayList;

public class IssuePageResult {
    private ArrayList<Issue> issues;
    private NextResource nextResource;

    public IssuePageResult(final ArrayList<Issue> issues, final NextResource nextResource) {
        this.issues = issues;
        this.nextResource = nextResource;
    }

    public IssuePageResult() { }

    public ArrayList<Issue> getIssues() {
        return issues;
    }

    public void setIssues(final ArrayList<Issue> issues) {
        this.issues = issues;
    }

    public NextResource getNextResource() {
        return nextResource;
    }

    public void setNextResource(final NextResource nextResource) {
        this.nextResource = nextResource;
    }
}
