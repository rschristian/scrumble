package com.bt.scrumbleLts.dto;

import java.util.ArrayList;

public class Issue {
    private final int iid;
    private final int project_id;
    private final String title;
    private final String description;
    private final User author;
    private final User assignee;
    private final String state;
    private final Sprint milestone;
    private final ArrayList<String> labels;
    private final String created_at;

    public Issue(int iid, int project_id, String title,
                 String description, User author, User assignee,
                 String state, Sprint milestone,
                 ArrayList<String> labels, String created_at) {
        this.project_id = project_id;
        this.milestone = milestone;
        this.author = author;
        this.description = description;
        this.state = state;
        this.iid = iid;
        this.assignee = assignee;
        this.labels = labels;
        this.title = title;
        this.created_at = created_at;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }
}
