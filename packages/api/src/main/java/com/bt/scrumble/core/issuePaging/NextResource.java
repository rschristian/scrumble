package com.bt.scrumble.core.issuePaging;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NextResource {
  private int projectId;
  private int pageSize;
  private int pageNumber;
}
