package com.nsa.bt.scrumble.repositories.implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import io.opentracing.Span;
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
public class WorkspaceRepository implements IWorkspaceRepository {

    private static final Logger logger = LoggerFactory.getLogger(WorkspaceRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public ArrayList<Integer> projectIdsForWorkspace(int workspaceId) {
        return jdbcTemplate.queryForObject(
                "SELECT workspace_data FROM workspaces WHERE id = ?;",
                new Object[]{workspaceId},
                (rs, rowNum) ->
                {
                    try {
                        return parseJsonDataToProjectIds(((PGobject) rs.getObject("workspace_data")));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return new ArrayList<>();
                }
        );
    }

    @Override
    public Workspace createWorkspace(Workspace workspace, User user) {
        String insertStatement = "INSERT INTO workspaces (name, created_by_user, description, workspace_data) VALUES (?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(insertStatement, new String[] {"id"});
            ps.setString(1, workspace.getName());
            ps.setInt(2, user.getId());
            ps.setString(3, workspace.getDescription());
            ps.setObject(4, getWorkspaceJsonbData(workspace));
            return ps;
        }, keyHolder);
        workspace.setId(Math.toIntExact(keyHolder.getKey().longValue()));
        return workspace;
    }

    private PGobject getWorkspaceJsonbData(Workspace workspace) {
        try {
            Map<Object, Object> dataMap = new HashMap<>();
            PGobject jsonObject = new PGobject();
            ObjectMapper objectMapper = new ObjectMapper();

            dataMap.put("project_ids", workspace.getProjectIds());
            dataMap.put("project_users", workspace.getUsers());
            String Map_Json_String = objectMapper.writeValueAsString(dataMap);
            jsonObject.setType("jsonb");
            jsonObject.setValue(Map_Json_String);
            return jsonObject;
        } catch (SQLException |JsonProcessingException exception) {
            logger.error(exception.getMessage());
            return null;
        }
    }

    @Override
    public List<Workspace> getAllWorkspaces(Span span) {
        Span newSpan = RepositoryTracer.getTracer().buildSpan("SQL Select All Workspaces").asChildOf(span).start();
        List<Workspace> workspaces = new ArrayList<>();
        String selectStatement = "SELECT * FROM workspaces as workspaces INNER JOIN users AS users ON workspaces.created_by_user = users.id";
        jdbcTemplate.query(selectStatement,
                (rs, row) -> {
                    try {
                        return new Workspace(
                                rs.getInt("id"),
                                new User(rs.getInt("created_by_user"), rs.getInt("service_id"), rs.getString("provider_id")),
                                rs.getString("name"),
                                rs.getString("description"),
                                parseJsonDataToProjectIds(((PGobject) rs.getObject("workspace_data"))),
                                parseJsonDataToUserList(((PGobject) rs.getObject("workspace_data"))));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return null;
                })
                .forEach(entry -> workspaces.add(entry));
        newSpan.finish();
        return workspaces;
    }

    private ArrayList<Integer> parseJsonDataToProjectIds(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (ArrayList<Integer>) mapper.readValue(jsonData.getValue(), Map.class).get("project_ids");
    }

    private List<User> parseJsonDataToUserList(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (List<User>) mapper.readValue(jsonData.getValue(), Map.class).get("project_users");
    }

    @Override
    public void deleteWorkspace(int workspaceId) {
        String deleteWorkspace = "DELETE FROM workspaces WHERE id = ?";
        Object[] params = new Object[]{ workspaceId };
        int[] types = new int[]{Types.INTEGER};
        jdbcTemplate.update(deleteWorkspace, params, types);
    }

    @Override
    public void editWorkspace(Workspace updatedWorkspace) {
        String deleteWorkspace = "UPDATE workspaces SET name = ?, description = ?, workspace_data = ? WHERE id = ?";
        Object[] params = new Object[]
                {
                    updatedWorkspace.getName(),
                    updatedWorkspace.getDescription(),
                    getWorkspaceJsonbData(updatedWorkspace),
                    updatedWorkspace.getId()
                };
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR, Types.OTHER, Types.INTEGER} ;
        jdbcTemplate.update(deleteWorkspace, params, types);
    }
}
