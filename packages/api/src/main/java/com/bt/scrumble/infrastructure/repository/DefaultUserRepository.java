package com.bt.scrumble.infrastructure.repository;

import com.bt.scrumble.application.data.UserData;
import com.bt.scrumble.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Optional;

@Repository
public class DefaultUserRepository implements UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public DefaultUserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserData createUser(UserData user) {
        String insertStatement = "INSERT INTO users (service_id, provider_id) VALUES (?, ?);";
        Object[] params = new Object[]{user.getServiceId(), user.getProviderId()};
        int[] types = new int[]{Types.INTEGER, Types.VARCHAR};
        jdbcTemplate.update(insertStatement, params, types);
        return user;
    }

    @Override
  public Optional<UserData> findUserByServiceId(int serviceId) {
    Optional<UserData> optionalUser = Optional.empty();
    try {
      optionalUser =
          jdbcTemplate.queryForObject(
              "SELECT * FROM users WHERE service_id = ?;",
              new Object[] {serviceId},
              (rs, rowNum) ->
                  Optional.of(
                      new UserData(
                          rs.getInt("id"), rs.getInt("service_id"), rs.getString("provider_id"))));
    } catch (IncorrectResultSizeDataAccessException ignored) {
    }
    return optionalUser;
  }

  @Override
  public Optional<UserData> findUserById(int id) {
    Optional<UserData> optionalUser = Optional.empty();
    try {
      optionalUser =
          jdbcTemplate.queryForObject(
              "SELECT * FROM users WHERE id = ?;",
              new Object[] {id},
              (rs, rowNum) ->
                  Optional.of(
                      new UserData(
                          rs.getInt("id"), rs.getInt("service_id"), rs.getString("provider_id"))));
    } catch (IncorrectResultSizeDataAccessException ignored) {
    }
    return optionalUser;
  }

  @Override
  public void addToken(int userId, String token) {
    String insertStatement = "UPDATE users SET access_token = ? WHERE id = ?";
    Object[] params = new Object[] {token, userId};
    int[] types = new int[] {Types.VARCHAR, Types.INTEGER};
    jdbcTemplate.update(insertStatement, params, types);
  }

  @Override
  public void removeToken(int userId) {
    String insertStatement = "UPDATE users SET access_token = null WHERE id = ?";
    Object[] params = new Object[] {userId};
    int[] types = new int[] {Types.INTEGER};
    jdbcTemplate.update(insertStatement, params, types);
  }

  @Override
  public Optional<String> getToken(int userId) {
    Optional<String> stringOptional = Optional.empty();
    try {
      stringOptional =
          jdbcTemplate.queryForObject(
              "SELECT * FROM users WHERE id = ?;",
              new Object[] {userId},
              (rs, rowNum) -> Optional.of(rs.getString("access_token")));
    } catch (IncorrectResultSizeDataAccessException ignored) {
    }
    return stringOptional;
  }
}
