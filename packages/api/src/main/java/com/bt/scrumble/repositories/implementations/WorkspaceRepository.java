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
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class WorkspaceRepository implements IWorkspaceRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(WorkspaceRepository.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Workspace> getAllWorkspaces() {
        var workspaces =
                new ArrayList<>(
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
        return workspaces;
    }

    @Override
    public ArrayList<Integer> projectIdsForWorkspace(int workspaceId) {
        ArrayList<Integer> projectIds =
                jdbcTemplate.queryForObject(
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
        return projectIds;
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

    @Override
    public Workspace createWorkspace(Workspace workspace, User user) {
        String insertStatement =
                "INSERT INTO workspaces (name, created_by_user, description, workspace_data) VALUES (?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(
                connection -> {
                    PreparedStatement ps = connection.prepareStatement(insertStatement, new String[]{"id"});
                    ps.setString(1, workspace.getName());
                    ps.setInt(2, user.getId());
                    ps.setString(3, workspace.getDescription());
                    ps.setObject(4, getWorkspaceJsonbData(workspace));
                    return ps;
                },
                keyHolder);
        workspace.setId(Math.toIntExact(Objects.requireNonNull(keyHolder.getKey()).longValue()));
        return workspace;
    }

    @Override
    public void editWorkspace(Workspace updatedWorkspace) {
        String deleteWorkspace =
                "UPDATE workspaces SET name = ?, description = ?, workspace_data = ? WHERE id = ?";
        Object[] params =
                new Object[]{
                        updatedWorkspace.getName(),
                        updatedWorkspace.getDescription(),
                        getWorkspaceJsonbData(updatedWorkspace),
                        updatedWorkspace.getId()
                };
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR, Types.OTHER, Types.INTEGER};
        jdbcTemplate.update(deleteWorkspace, params, types);
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
