package com.nsa.bt.scrumble.repositories.implementations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import org.postgresql.util.PGobject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    public List<Integer> projectIdsForWorkspace(int workspaceId) {
        List<Integer> projectIds = new ArrayList<>();
        String selectStatement = "SELECT * FROM workspace_projects";
        jdbcTemplate.query(selectStatement,
                (rs, row) -> rs.getInt("project_id"))
                .forEach(entry -> projectIds.add(entry));
        return projectIds;
    }

    @Override
    public Workspace createWorkspace(Workspace workspace, User user) {
        String insertStatement = "INSERT INTO workspaces (name, created_by_user, description) VALUES (?, ?, ?);";
        Object[] params = new Object[]{ workspace.getName(), user.getId(), workspace.getDescription()};
        int[] types = new int[]{ Types.VARCHAR, Types.INTEGER, Types.VARCHAR };
        jdbcTemplate.update(insertStatement, params, types);
        return workspace;
    }

    @Override
    public List<Workspace> getAllWorkspaces() {
        List<Workspace> workspaces = new ArrayList<>();
        String selectStatement = "SELECT * FROM workspaces as workspaces INNER JOIN users AS users ON workspaces.created_by_user = users.id";
        jdbcTemplate.query(selectStatement,
                (rs, row) -> new Workspace(
                        rs.getInt("id"),
                        new User(rs.getInt("created_by_user"), rs.getInt("service_id"), rs.getString("provider_id")),
                        rs.getString("name"),
                        rs.getString("description"),
                        new int[] {1, 3, 5}))
                .forEach(entry -> workspaces.add(entry));
        return workspaces;
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
        String deleteWorkspace = "UPDATE workspaces SET name = ?, description = ? WHERE id = ?";
        Object[] params = new Object[]{ updatedWorkspace.getName(), updatedWorkspace.getDescription(), updatedWorkspace.getId() };
        int[] types = new int[]{ Types.VARCHAR, Types.VARCHAR, Types.INTEGER} ;
        jdbcTemplate.update(deleteWorkspace, params, types);
    }

    @Override
    public void associateProjectsWithWorkspace(int workspaceId, int[] projectIds) {
        String appendProjectIds = "UPDATE workspaces SET workspace_data = (\n" +
                "    CASE\n" +
                "        WHEN workspace_data IS NULL THEN '[]'::JSONB\n" +
                "        ELSE project_ids\n" +
                "    END\n" +
                ") || '[\"newString\"]'::JSONB WHERE id = ?;";

        try {
            Map<Object, Object> dataMap = new HashMap<>();
            dataMap.put("project_ids", projectIds);
            String updateProjectIds = "UPDATE workspaces SET workspace_data = workspace_data || ? WHERE id = ?;";

            ObjectMapper objectMapper = new ObjectMapper();
            PGobject jsonObject = new PGobject();
            String Map_Json_String = objectMapper.writeValueAsString(dataMap);
            jsonObject.setType("jsonb");
            jsonObject.setValue(Map_Json_String);

            Object[] params = new Object[]{ jsonObject, workspaceId };

            int[] types = new int[]{ Types.OTHER, Types.INTEGER } ;
            jdbcTemplate.update(updateProjectIds, params, types);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

    }
}
