package com.bt.scrumble.repositories.implementations;

import com.bt.scrumble.models.User;
import com.bt.scrumble.models.Workspace;
import com.bt.scrumble.repositories.IWorkspaceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.util.PGobject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class WorkspaceRepository implements IWorkspaceRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(WorkspaceRepository.class);

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public WorkspaceRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Workspace> getAllWorkspaces() {
        return new ArrayList<>(
                jdbcTemplate.query(
                        "SELECT * FROM workspaces INNER JOIN users ON workspaces.created_by_user = users.id",
                        (rs, row) -> {
                            try {
                                return new Workspace(
                                        rs.getInt("id"),
                                        new User(
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
                new Object[]{workspaceId},
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
    public List<User> workspaceUserList(int workspaceId) {
        return jdbcTemplate.queryForObject(
                "SELECT workspace_data FROM workspaces WHERE id = ?;",
                new Object[]{workspaceId},
                (rs, rowNum) -> {
                    try {
                        return parseJsonDataToUserList(((PGobject) rs.getObject("workspace_data")));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return new ArrayList<>();
                });
    }

    private PGobject getWorkspaceJsonbData(Workspace workspace) {
        try {
            PGobject jsonObject = new PGobject();
            ObjectMapper objectMapper = new ObjectMapper();

            jsonObject.setType("jsonb");
            jsonObject.setValue(
                    objectMapper.writeValueAsString(
                            Map.of(
                                    "project_ids",
                                    workspace.getProjectIds(),
                                    "project_users",
                                    workspace.getUsers())));
            return jsonObject;
        } catch (SQLException | JsonProcessingException exception) {
            LOGGER.error(exception.getMessage());
            return null;
        }
    }

    private ArrayList<Integer> parseJsonDataToProjectIds(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (ArrayList<Integer>) mapper.readValue(jsonData.getValue(), Map.class).get("project_ids");
    }

    private List<User> parseJsonDataToUserList(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (List<User>) mapper.readValue(jsonData.getValue(), Map.class).get("project_users");
    }
}
