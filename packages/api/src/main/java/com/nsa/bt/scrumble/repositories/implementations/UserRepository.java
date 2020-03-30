package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Optional;

@Repository
public class UserRepository implements IUserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public User createUser(User user) {
        String insertStatement = "INSERT INTO users (service_id, provider_id) VALUES (?, ?);";
        Object[] params = new Object[]{ user.getServiceId(), user.getProviderId() };
        int[] types = new int[]{ Types.INTEGER, Types.VARCHAR };
        jdbcTemplate.update(insertStatement, params, types);
        return user;
    }

    @Override
    public Optional<User> findUserByServiceId(int serviceId) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE service_id = ?;",
                    new Object[]{serviceId},
                    (rs, rowNum) ->
                            Optional.of(new User(
                                    rs.getInt("id"),
                                    rs.getInt("service_id"),
                                    rs.getString("provider_id")
                            ))
            );
        } catch (IncorrectResultSizeDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public Optional<User> findUserById(int id) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id = ?;",
                    new Object[]{id},
                    (rs, rowNum) ->
                            Optional.of(new User(
                                    rs.getInt("id"),
                                    rs.getInt("service_id"),
                                    rs.getString("provider_id")
                            ))
            );
        } catch (IncorrectResultSizeDataAccessException e) {
            return Optional.empty();
        }
    }

    @Override
    public void addToken(int userId, String token) {
        String insertStatement = "UPDATE users SET access_token = ? WHERE id = ?";
        Object[] params = new Object[]{ token, userId };
        int[] types = new int[]{ Types.VARCHAR, Types.INTEGER };
        jdbcTemplate.update(insertStatement, params, types);
    }

    @Override
    public void removeToken(int userId) {
        String insertStatement = "UPDATE users SET access_token = null WHERE id = ?";
        Object[] params = new Object[]{ userId };
        int[] types = new int[]{ Types.INTEGER };
        jdbcTemplate.update(insertStatement, params, types);
    }

    @Override
    public Optional<String> getToken(int userId) {
        try {
            return jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id = ?;",
                    new Object[]{userId},
                    (rs, rowNum) ->
                            Optional.of(rs.getString("access_token"))
            );
        } catch (IncorrectResultSizeDataAccessException e) {
            return Optional.empty();
        }
    }
}
