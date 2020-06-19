package com.bt.scrumble.infrastructure.repository;

import com.bt.scrumble.application.models.Sprint;
import com.bt.scrumble.core.sprint.SprintRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.util.PGobject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DefaultSprintRepository implements SprintRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultSprintRepository.class);

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DefaultSprintRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Sprint getSprintById(int sprintId) {
        var sprint =
                jdbcTemplate.queryForObject(
                        "SELECT * FROM sprints where id = ?",
                        new Object[]{sprintId},
                        new int[]{Types.INTEGER},
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
    return sprint;
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
    var sprints = mapRowsToSprintList(selectStatement, params, types);
    return sprints;
  }

  @Override
  public Map<String, Integer> getProjectIdsToMilestoneIds(int sprintId) {
    var projectIdsToMilestoneIds =
        jdbcTemplate.queryForObject(
            "SELECT sprint_data FROM sprints where id = ?",
            new Object[] {sprintId},
            new int[] {Types.INTEGER},
            (rs, row) -> {
              try {
                return parseJsonDataToMilestoneIds(((PGobject) rs.getObject("sprint_data")));
              } catch (Exception e) {
                e.printStackTrace();
              }
              return null;
            });
    return projectIdsToMilestoneIds;
  }

  @Override
  public Sprint createSprint(int workspaceId, Sprint sprint) {
    KeyHolder keyHolder = new GeneratedKeyHolder();

    jdbcTemplate.update(
        connection -> {
          PreparedStatement ps =
              connection.prepareStatement(
                  "INSERT INTO sprints (workspace_id, title, description, status, start_date, due_date, sprint_data) "
                      + "VALUES (?, ?, ?, ?, ?, ?, ?);",
                  new String[] {"id"});
          ps.setInt(1, workspaceId);
          ps.setString(2, sprint.getTitle());
          ps.setString(3, sprint.getDescription());
          ps.setString(4, sprint.getStatus());
          ps.setDate(5, sprint.getStartDate());
          ps.setDate(6, sprint.getDueDate());
          ps.setObject(7, getSprintJsonbData(sprint));
          return ps;
        },
        keyHolder);
    sprint.setId(Math.toIntExact(keyHolder.getKey().longValue()));
    return sprint;
  }

  @Override
  public Sprint editSprint(int workspaceId, Sprint sprint) {
    jdbcTemplate.update(
        "UPDATE sprints SET title = ?, description = ?, status = ?, start_date = ?, due_date = ?, sprint_data = ? WHERE id = ?",
        new Object[] {
          sprint.getTitle(),
          sprint.getDescription(),
          sprint.getStatus(),
          sprint.getStartDate(),
          sprint.getDueDate(),
          getSprintJsonbData(sprint),
          sprint.getId()
        },
        new int[] {
          Types.VARCHAR,
          Types.VARCHAR,
          Types.VARCHAR,
          Types.DATE,
          Types.DATE,
          Types.OTHER,
          Types.INTEGER
        });
    return sprint;
  }

  private List<Sprint> mapRowsToSprintList(String sqlSelect, Object[] params, int[] types) {
    var sprintList =
        new ArrayList<>(
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
    return sprintList;
  }

  private PGobject getSprintJsonbData(Sprint sprint) {
    try {
      Map<Object, Object> dataMap = new HashMap<>();
      PGobject jsonObject = new PGobject();
      ObjectMapper objectMapper = new ObjectMapper();

      dataMap.put("projects_to_milestones", sprint.getProjectIdToMilestoneIds());
      jsonObject.setType("jsonb");
      jsonObject.setValue(objectMapper.writeValueAsString(dataMap));
      return jsonObject;
    } catch (SQLException | JsonProcessingException exception) {
      LOGGER.error(exception.getMessage());
      return null;
    }
  }

  private Map<String, Integer> parseJsonDataToMilestoneIds(PGobject jsonData) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    return (Map<String, Integer>)
        mapper.readValue(jsonData.getValue(), Map.class).get("projects_to_milestones");
  }
}
