package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.models.Workspace;
import com.nsa.bt.scrumble.repositories.IWorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

@Repository
public class WorkspaceRepository implements IWorkspaceRepository {

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
                        rs.getString("description")))
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
}
