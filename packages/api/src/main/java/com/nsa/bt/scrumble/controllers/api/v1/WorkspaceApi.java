package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

public class WorkspaceApi {

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getWorkspace(@PathVariable(value="id") int id) {
        Issue issue = new Issue(id, "An issue name", "An issue description", 8, "Phoenix Project");

        return ResponseEntity.ok().body(issue);
    }

    @GetMapping("/{id}/issues")
    public ResponseEntity<Object> getIssues(@PathVariable(value="id") int id) {
        Issue issue = new Issue(id, "An issue name", "An issue description", 8, "Phoenix Project");

        return ResponseEntity.ok().body(issue);
    }
}
