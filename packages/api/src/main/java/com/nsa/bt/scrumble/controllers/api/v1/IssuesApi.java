package com.nsa.bt.scrumble.controllers.api.v1;

import com.nsa.bt.scrumble.dto.Issue;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/v1/issues")
public class IssuesApi {

    private static final Logger logger = LoggerFactory.getLogger(IssuesApi.class);

    @GetMapping("/{id}")
    public ResponseEntity<Issue> getUserInfo(@PathVariable(value="id") int id){
        Issue issue = new Issue(id, "An issue name", "An issue description", 8, "Phoenix Project");

        return ResponseEntity.ok().body(issue);
    }
}
