package com.bt.scrumble.infrastructure.repository;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.application.data.WorkspaceData;
import com.bt.scrumble.core.workspace.WorkspaceRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.util.PGobject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class DefaultWorkspaceRepository implements WorkspaceRepository {

  private static final Logger LOGGER = LoggerFactory.getLogger(DefaultWorkspaceRepository.class);

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public DefaultWorkspaceRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public List<WorkspaceData> getAllWorkspaces() {
    return new ArrayList<>(
        jdbcTemplate.query(
            "SELECT * FROM workspaces INNER JOIN users ON workspaces.created_by_user = users.id",
            (rs, row) -> {
              try {
                return new WorkspaceData(
                    rs.getInt("id"),
                    new UserData(
                        rs.getInt("created_by_user"),
                        rs.getInt("service_id"),
                        rs.getString("provider_id")),
                    rs.getString("name"),
                    rs.getString("description"),
                    parseJsonDataToProjectIds(((PGobject) rs.getObject("workspace_data"))),
                    parseJsonDataToUserList(((PGobject) rs.getObject("workspace_data"))));
              } catch (IOException e) {
                e.printStackTrace();
              }
              return null;
            }));
  }

  @Override
  public ArrayList<Integer> projectIdsForWorkspace(int workspaceId) {
    return jdbcTemplate.queryForObject(
        "SELECT workspace_data FROM workspaces WHERE id = ?;",
        new Object[] {workspaceId},
        (rs, rowNum) -> {
          try {
            return parseJsonDataToProjectIds(((PGobject) rs.getObject("workspace_data")));
          } catch (IOException e) {
            e.printStackTrace();
          }
          return new ArrayList<>();
        });
  }

  @Override
  public List<UserData> workspaceUserList(int workspaceId) {
    return jdbcTemplate.queryForObject(
        "SELECT workspace_data FROM workspaces WHERE id = ?;",
        new Object[] {workspaceId},
        (rs, rowNum) -> {
          try {
            return parseJsonDataToUserList(((PGobject) rs.getObject("workspace_data")));
          } catch (IOException e) {
            e.printStackTrace();
          }
          return new ArrayList<>();
        });
  }

  private ArrayList<Integer> parseJsonDataToProjectIds(PGobject jsonData) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    return (ArrayList<Integer>) mapper.readValue(jsonData.getValue(), Map.class).get("project_ids");
  }

  private List<UserData> parseJsonDataToUserList(PGobject jsonData) throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    return (List<UserData>) mapper.readValue(jsonData.getValue(), Map.class).get("project_users");
  }
}
