package com.nsa.bt.scrumble.rowmappers;

import com.nsa.bt.scrumble.models.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Passed to JDBC query to map result set to model.
 */
public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setServiceId(rs.getInt("service_id"));
        user.setProviderId(rs.getString("provider_id"));
        return user;
    }
}
