package com.nsa.bt.scrumble.repositories.implementations;

import com.nsa.bt.scrumble.models.User;
import com.nsa.bt.scrumble.repositories.IUserRepository;
import io.opentracing.Span;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Optional;

@Repository
public class UserRepository implements IUserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public User createUser(User user, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Insert New User").asChildOf(parentSpan).start();
        String insertStatement = "INSERT INTO users (service_id, provider_id) VALUES (?, ?);";
        Object[] params = new Object[]{user.getServiceId(), user.getProviderId()};
        int[] types = new int[]{Types.INTEGER, Types.VARCHAR};
        jdbcTemplate.update(insertStatement, params, types);
        span.finish();
        return user;
    }

    @Override
    public Optional<User> findUserByServiceId(int serviceId, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Select User by Service ID").asChildOf(parentSpan).start();
        Optional<User> optionalUser = Optional.empty();
        try {
            optionalUser = jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE service_id = ?;",
                    new Object[]{serviceId},
                    (rs, rowNum) ->
                            Optional.of(new User(
                                    rs.getInt("id"),
                                    rs.getInt("service_id"),
                                    rs.getString("provider_id")
                            ))
            );
        } catch (IncorrectResultSizeDataAccessException ignored) { }
        span.finish();
        return optionalUser;
    }

    @Override
    public Optional<User> findUserById(int id, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Select User by ID").asChildOf(parentSpan).start();
        Optional<User> optionalUser = Optional.empty();
        try {
            optionalUser = jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id = ?;",
                    new Object[]{id},
                    (rs, rowNum) ->
                            Optional.of(new User(
                                    rs.getInt("id"),
                                    rs.getInt("service_id"),
                                    rs.getString("provider_id")
                            ))
            );
        } catch (IncorrectResultSizeDataAccessException ignored) { }
        span.finish();
        return optionalUser;
    }

    @Override
    public void addToken(int userId, String token, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Insert Token into User").asChildOf(parentSpan).start();
        String insertStatement = "UPDATE users SET access_token = ? WHERE id = ?";
        Object[] params = new Object[]{token, userId};
        int[] types = new int[]{Types.VARCHAR, Types.INTEGER};
        jdbcTemplate.update(insertStatement, params, types);
        span.finish();
    }

    @Override
    public void removeToken(int userId, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Remove Token from User").asChildOf(parentSpan).start();
        String insertStatement = "UPDATE users SET access_token = null WHERE id = ?";
        Object[] params = new Object[]{userId};
        int[] types = new int[]{Types.INTEGER};
        jdbcTemplate.update(insertStatement, params, types);
        span.finish();
    }

    @Override
    public Optional<String> getToken(int userId, Span parentSpan) {
        var span = RepositoryTracer.getTracer().buildSpan("SQL Select Token from User").asChildOf(parentSpan).start();
        Optional<String> stringOptional = Optional.empty();
        try {
            stringOptional = jdbcTemplate.queryForObject(
                    "SELECT * FROM users WHERE id = ?;",
                    new Object[]{userId},
                    (rs, rowNum) ->
                            Optional.of(rs.getString("access_token"))
            );
        } catch (IncorrectResultSizeDataAccessException ignored) { }
        span.finish();
        return stringOptional;
    }
}
