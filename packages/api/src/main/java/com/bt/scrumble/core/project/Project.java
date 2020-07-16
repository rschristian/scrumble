package com.bt.scrumble.core.project;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project implements Serializable {
  private int id;
  private String name;
  private String description;
  @JsonAlias("avatar_url")
  private String avatarUrl;
}
