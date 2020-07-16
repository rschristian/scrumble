package com.bt.scrumble.lts.application.seeddata;

import com.bt.scrumble.lts.dto.Milestone;

import java.time.LocalDate;
import java.util.Map;

public class SeedMilestones {
  private static final Map<String, Integer> projectIdToMilestoneIds =
      Map.of("1", 1, "2", 2, "3", 3, "4", 4, "5", 5);

  private static final Milestone milestone1 =
      new Milestone(1, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          projectIdToMilestoneIds);

  private static final Milestone milestone2 =
      new Milestone(2, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          projectIdToMilestoneIds);

  private static final Milestone milestone3 =
      new Milestone(3, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          projectIdToMilestoneIds);

  private static final Milestone milestone4 =
      new Milestone(4, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          projectIdToMilestoneIds);

  private static final Milestone milestone5 =
      new Milestone(5, "Requirement Gathering", "", "open",
          LocalDate.now().toString(), LocalDate.now().plusDays(1).toString(),
          projectIdToMilestoneIds);

  public static Milestone getMilestone1() {
    return milestone1;
  }

  public static Milestone getMilestone2() {
    return milestone2;
  }

  public static Milestone getMilestone3() {
    return milestone3;
  }

  public static Milestone getMilestone4() {
    return milestone4;
  }

  public static Milestone getMilestone5() {
    return milestone5;
  }
}
