package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.Issue;
import com.nsa.bt.scrumble.repositories.IIssueRepository;

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
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import java.io.IOException;
import java.util.Date;
import java.sql.Timestamp;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Optional;

@Repository
public class IssueRepository implements IIssueRepository {

    private static final Logger logger = LoggerFactory.getLogger(SprintRepository.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void updateStartDate(int issueId) {
        Date currentDate = new Date();
        Optional<Issue> issue = findIssueById(issueId);
        if(!issue.isPresent()){
            String insertStatement = "INSERT INTO issues (id, start_date) VALUES (?,?);";
            Object[] params = new Object[]{ issueId, new Timestamp(currentDate.getTime())};
            int[] types = new int[]{ Types.INTEGER, Types.TIMESTAMP };
            jdbcTemplate.update(insertStatement, params, types);
        }
    }

    @Override
    public void updateDueDate(int issueId) {
        Date currentDate = new Date();
        String updateStatement = "UPDATE issues SET due_date = ? WHERE id = ?;";
        Object[] params = new Object[]{ new Timestamp(currentDate.getTime()), issueId};
        int[] types = new int[]{ Types.TIMESTAMP, Types.INTEGER };
        jdbcTemplate.update(updateStatement, params, types);
    }

    @Override
    public void removeIssue(int issueId) {
        String deleteStatement = "DELETE FROM issues WHERE id = ?;";
        Object[] params = new Object[]{issueId};
        int[] types = new int[]{ Types.INTEGER };
        jdbcTemplate.update(deleteStatement, params, types);
    }

    @Override
    public void removeDueDate(int issueId) {
        String updateStatement = "UPDATE issues SET due_date = NULL WHERE id = ?;";
        Object[] params = new Object[]{ issueId};
        int[] types = new int[]{ Types.INTEGER };
        jdbcTemplate.update(updateStatement, params, types);
    }

    @Override
    public Integer calculateTime(int issueId) {
        try {
            return jdbcTemplate.queryForObject(
                "SELECT EXTRACT(EPOCH FROM (due_date - start_date)) FROM issues WHERE id = ?;",
                new Object[]{issueId},
                Integer.class
            );
        } catch (IncorrectResultSizeDataAccessException e){
            return 0;
        }
    }

    private Optional<Issue> findIssueById(int issueId) {
        try{
            return jdbcTemplate.queryForObject(
                "SELECT * FROM issues WHERE id = ?;",
                new Object[]{issueId},
                (rs, rowNum) ->
                    Optional.of(new Issue(
                        rs.getInt("Id"),
                        rs.getDate("start_date"),
                        rs.getDate("due_date")
                    ))
            );
        } catch (IncorrectResultSizeDataAccessException e){
            return Optional.empty();
        }
    }
}