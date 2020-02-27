package com.nsa.bt.scrumble.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Issue {
    private int id;
    private String name;
    private String description;
    private int storyPoint;
    private String project;
}
