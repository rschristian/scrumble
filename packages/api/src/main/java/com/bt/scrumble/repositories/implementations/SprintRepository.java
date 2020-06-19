package com.bt.scrumble.repositories.implementations;

import com.bt.scrumble.models.Sprint;
import com.bt.scrumble.repositories.ISprintRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class SprintRepository implements ISprintRepository {

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public SprintRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public Sprint getSprintById(int sprintId) {
    return jdbcTemplate.queryForObject(
        "SELECT * FROM sprints where id = ?",
        new Object[] {sprintId},
        new int[] {Types.INTEGER},
        (rs, row) -> {
          try {
            return new Sprint(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getString("status"),
                rs.getDate("start_date"),
                rs.getDate("due_date"),
                parseJsonDataToMilestoneIds(((PGobject) rs.getObject("sprint_data"))));
          } catch (Exception e) {
            e.printStackTrace();
          }
          return null;
        });
  }

  @Override
  public List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter) {
    String selectStatement;
    Object[] params;
    int[] types;
    if (filter.equalsIgnoreCase("none")) {
      selectStatement = "SELECT * FROM sprints where workspace_id = ?";
      params = new Object[] {workspaceId};
      types = new int[] {Types.INTEGER};
    } else {
      selectStatement = "SELECT * FROM sprints where workspace_id = ? AND status = ?";
      params = new Object[] {workspaceId, filter};
      types = new int[] {Types.INTEGER, Types.VARCHAR};
    }
    return mapRowsToSprintList(selectStatement, params, types);
  }

  private List<Sprint> mapRowsToSprintList(String sqlSelect, Object[] params, int[] types) {
    return new ArrayList<>(
        jdbcTemplate.query(
            sqlSelect,
            params,
            types,
            (rs, row) -> {
              try {
                return new Sprint(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("description"),
                    rs.getString("status"),
                    rs.getDate("start_date"),
                    rs.getDate("due_date"),
                    parseJsonDataToMilestoneIds(((PGobject) rs.getObject("sprint_data"))));
              } catch (Exception e) {
                e.printStackTrace();
              }
              return null;
            }));
  }

  private Map<String, Integer> parseJsonDataToMilestoneIds(PGobject jsonData) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    return (Map<String, Integer>)
        mapper.readValue(jsonData.getValue(), Map.class).get("projects_to_milestones");
  }
}
