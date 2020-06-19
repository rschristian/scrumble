package com.bt.scrumble.core.issuePaging;

import com.bt.scrumble.core.issue.Issue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
public class IssuePageResult {
  private ArrayList<Issue> issues = new ArrayList<Issue>();
  private NextResource nextResource;

  public void appendIssues(ArrayList<Issue> issues) {
    this.issues.addAll(issues);
  }
}
