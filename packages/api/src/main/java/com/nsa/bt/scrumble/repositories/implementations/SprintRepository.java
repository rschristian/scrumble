package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.Sprint;
import com.nsa.bt.scrumble.repositories.ISprintRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.postgresql.util.PGobject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;

@Repository
public class SprintRepository  implements ISprintRepository {

    private static final Logger logger = LoggerFactory.getLogger(SprintRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Sprint createSprint(int workspaceId, Sprint sprint)  {
        String insertStatement = "INSERT INTO sprints (workspace_id, title, description, status, start_date, due_date, sprint_data) VALUES (?, ?, ?, ?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();


        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection
                    .prepareStatement(insertStatement, new String[] {"id"});
            ps.setInt(1, workspaceId);
            ps.setString(2, sprint.getTitle());
            ps.setString(3, sprint.getDescription());
            ps.setString(4, sprint.getStatus());
            ps.setDate(5, sprint.getStartDate());
            ps.setDate(6, sprint.getDueDate());
            ps.setObject(7, getSprintJsonbData(sprint));
            return ps;
        }, keyHolder);
        sprint.setId(Math.toIntExact(keyHolder.getKey().longValue()));
        return sprint;
    }

    @Override
    public void deleteSprint(int sprintId) {
        String deleteWorkspace = "DELETE FROM sprints WHERE id = ?";
        Object[] params = new Object[]{ sprintId };
        int[] types = new int[]{Types.INTEGER};
        jdbcTemplate.update(deleteWorkspace, params, types);
    }

    @Override
    public List<Sprint> getAllSprintsForWorkspace(int workspaceId) {
        List<Sprint> sprints = new ArrayList<>();
        String selectStatement = "SELECT * FROM sprints where workspace_id = ?";
        jdbcTemplate.query(selectStatement,
                (rs, row) -> {
                    try {
                        return new Sprint(
                                rs.getInt("id"),
                                rs.getString("title"),
                                rs.getString("description"),
                                rs.getString("status"),
                                rs.getDate("start_date"),
                                rs.getDate("due_date"),
                                parseJsonDataToMilestoneIds((PGobject) rs.getObject("projects_to_milestones")));
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return null;
                },
                new MapSqlParameterSource(":workspaceId", workspaceId))
                .forEach(entry -> sprints.add(entry));
        return sprints;
    }

    private PGobject getSprintJsonbData(Sprint sprint) {
        try {
            Map<Object, Object> dataMap = new HashMap<>();
            PGobject jsonObject = new PGobject();
            ObjectMapper objectMapper = new ObjectMapper();
//
//            Iterator iterator = sprint.getProjectIdToMilestoneIds().entrySet().iterator();
//            while (iterator.hasNext()) {
//                logger.info(((Map.Entry) iterator.next()).getKey().toString() + " : " + ((Map.Entry) iterator.next()).getValue().toString() );
//            }

            dataMap.put("projects_to_milestones", sprint.getProjectIdToMilestoneIds());
            String Map_Json_String = objectMapper.writeValueAsString(dataMap);
            jsonObject.setType("jsonb");
            jsonObject.setValue(Map_Json_String);
            return jsonObject;
        } catch (SQLException | JsonProcessingException exception) {
            logger.error(exception.getMessage());
            return null;
        }
    }

    private Map<Integer, Integer> parseJsonDataToMilestoneIds(PGobject jsonData) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (Map<Integer, Integer>) mapper.readValue(jsonData.getValue(), Map.class).get("projects_to_milestones");
    }
}
