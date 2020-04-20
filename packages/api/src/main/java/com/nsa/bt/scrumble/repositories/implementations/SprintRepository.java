package com.nsa.bt.scrumble.repositories.implementations;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.repositories.ISprintRepository;
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
public class SprintRepository implements ISprintRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(SprintRepository.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Sprint getSprintById(int sprintId, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Select Sprint by ID").asChildOf(parentSpan).start();
        var sprint = jdbcTemplate.queryForObject("SELECT * FROM sprints where id = ?",
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
        span.setTag("sql query", "SELECT * FROM sprints where id = ?");
        span.finish();
        return sprint;
    }

    @Override
    public List<Sprint> getAllSprintsForWorkspace(int workspaceId, String filter, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("Get all Sprints for Workspace").asChildOf(parentSpan).start();
        String selectStatement;
        Object[] params;
        int[] types;
        if (filter.equalsIgnoreCase("none")) {
            selectStatement = "SELECT * FROM sprints where workspace_id = ?";
            params = new Object[]{workspaceId};
            types = new int[]{Types.INTEGER};
        } else {
            selectStatement = "SELECT * FROM sprints where workspace_id = ? AND status = ?";
            params = new Object[]{workspaceId, filter};
            types = new int[]{Types.INTEGER, Types.VARCHAR};
        }
        var sprints = mapRowsToSprintList(selectStatement, params, types, span);
        span.finish();
        return sprints;
    }

    @Override
    public Map<String, Integer> getProjectIdsToMilestoneIds(int sprintId, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Select Project IDs to Milestone IDs").asChildOf(parentSpan).start();
        var projectIdsToMilestoneIds = jdbcTemplate.queryForObject("SELECT sprint_data FROM sprints where id = ?",
                new Object[]{sprintId},
                new int[]{Types.INTEGER},
                (rs, row) -> {
                    try {
                        return parseJsonDataToMilestoneIds(((PGobject) rs.getObject("sprint_data")));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return null;
                });
        span.setTag("sql query", "SELECT sprint_data FROM sprints where id = ?");
        span.finish();
        return projectIdsToMilestoneIds;
    }

    @Override
    public Sprint createSprint(int workspaceId, Sprint sprint, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Insert New Sprint").asChildOf(parentSpan).start();
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(
                            "INSERT INTO sprints (workspace_id, title, description, status, start_date, due_date, sprint_data) "
                                    + "VALUES (?, ?, ?, ?, ?, ?, ?);",
                            new String[]{"id"});
            ps.setInt(1, workspaceId);
            ps.setString(2, sprint.getTitle());
            ps.setString(3, sprint.getDescription());
            ps.setString(4, sprint.getStatus());
            ps.setDate(5, sprint.getStartDate());
            ps.setDate(6, sprint.getDueDate());
            ps.setObject(7, getSprintJsonbData(sprint, span));
            return ps;
        }, keyHolder);
        sprint.setId(Math.toIntExact(keyHolder.getKey().longValue()));
        span.setTag("sql query", "INSERT INTO sprints (workspace_id, title, description, status, start_date, due_date, sprint_data)");
        span.finish();
        return sprint;
    }

    @Override
    public Sprint editSprint(int workspaceId, Sprint sprint, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Update Sprint").asChildOf(parentSpan).start();
        jdbcTemplate.update(
                "UPDATE sprints SET title = ?, description = ?, status = ?, start_date = ?, due_date = ?, sprint_data = ? WHERE id = ?",
                new Object[]{
                        sprint.getTitle(),
                        sprint.getDescription(),
                        sprint.getStatus(),
                        sprint.getStartDate(),
                        sprint.getDueDate(),
                        getSprintJsonbData(sprint, span),
                        sprint.getId()
                },
                new int[]{Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.DATE, Types.DATE, Types.OTHER, Types.INTEGER}
        );
        span.finish();
        span.setTag("sql query", "UPDATE sprints SET title = ?, description = ?, status = ?, start_date = ?, due_date = ?, sprint_data = ? WHERE id = ?");
        return sprint;
    }

    private List<Sprint> mapRowsToSprintList(String sqlSelect, Object[] params, int[] types, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Map Rows to Sprint List").asChildOf(parentSpan).start();
        var sprintList = new ArrayList<>(jdbcTemplate.query(sqlSelect,
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
        span.setTag("sql query", sqlSelect);
        span.finish();
        return sprintList;
    }

    private PGobject getSprintJsonbData(Sprint sprint, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("Get Sprint JSONB Data").asChildOf(parentSpan).start();
        try {
            Map<Object, Object> dataMap = new HashMap<>();
            PGobject jsonObject = new PGobject();
            ObjectMapper objectMapper = new ObjectMapper();

            dataMap.put("projects_to_milestones", sprint.getProjectIdToMilestoneIds());
            jsonObject.setType("jsonb");
            jsonObject.setValue(objectMapper.writeValueAsString(dataMap));
            span.finish();
            return jsonObject;
        } catch (SQLException | JsonProcessingException exception) {
            LOGGER.error(exception.getMessage());
            span.finish();
            return null;
        }
    }

    private Map<String, Integer> parseJsonDataToMilestoneIds(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (Map<String, Integer>) mapper.readValue(jsonData.getValue(), Map.class).get("projects_to_milestones");
    }
}
