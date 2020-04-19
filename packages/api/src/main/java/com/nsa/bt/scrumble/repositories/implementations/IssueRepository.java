package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.Issue;
import com.nsa.bt.scrumble.repositories.IIssueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.sql.Types;
import java.util.Date;
import java.util.Optional;

@Repository
public class IssueRepository implements IIssueRepository {

    private static final Logger logger = LoggerFactory.getLogger(SprintRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void updateStartTime(int issueId, int projectId) {
        Date currentDate = new Date();
        Optional<Issue> issue = findIssueById(issueId, projectId);
        if (!issue.isPresent()) {
            String insertStatement = "INSERT INTO issues (id, project_id, start_time) VALUES (?,?,?);";
            Object[] params = new Object[]{issueId, projectId, new Timestamp(currentDate.getTime())};
            int[] types = new int[]{Types.INTEGER, Types.INTEGER, Types.TIMESTAMP};
            jdbcTemplate.update(insertStatement, params, types);
        }
    }

    @Override
    public void updateEndTime(int issueId, int projectId) {
        Date currentDate = new Date();
        String updateStatement = "UPDATE issues SET end_time = ? WHERE id = ? AND project_id = ?;";
        Object[] params = new Object[]{new Timestamp(currentDate.getTime()), issueId, projectId};
        int[] types = new int[]{Types.TIMESTAMP, Types.INTEGER, Types.INTEGER};
        jdbcTemplate.update(updateStatement, params, types);
    }

    @Override
    public void removeIssue(int issueId, int projectId) {
        String deleteStatement = "DELETE FROM issues WHERE id = ? AND project_id = ?;";
        Object[] params = new Object[]{issueId, projectId};
        int[] types = new int[]{Types.INTEGER, Types.INTEGER};
        jdbcTemplate.update(deleteStatement, params, types);
    }

    @Override
    public void removeEndTime(int issueId, int projectId) {
        String updateStatement = "UPDATE issues SET end_time = NULL WHERE id = ? AND project_id= ?;";
        Object[] params = new Object[]{issueId, projectId};
        int[] types = new int[]{Types.INTEGER, Types.INTEGER};
        jdbcTemplate.update(updateStatement, params, types);
    }

    @Override
    public Integer calculateTime(int issueId, int projectId) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT EXTRACT(EPOCH FROM (end_time - start_time)) FROM issues WHERE id = ? AND project_id = ?;",
                    new Object[]{issueId, projectId},
                    Integer.class
            );
        } catch (IncorrectResultSizeDataAccessException e) {
            return 0;
        }
    }

    private Optional<Issue> findIssueById(int issueId, int projectId) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * FROM issues WHERE id = ? AND project_id = ?;",
                    new Object[]{issueId, projectId},
                    (rs, rowNum) ->
                            Optional.of(new Issue(
                                    rs.getInt("Id"),
                                    rs.getDate("start_time"),
                                    rs.getDate("end_time")
                            ))
            );
        } catch (IncorrectResultSizeDataAccessException e) {
            return Optional.empty();
        }
    }
}