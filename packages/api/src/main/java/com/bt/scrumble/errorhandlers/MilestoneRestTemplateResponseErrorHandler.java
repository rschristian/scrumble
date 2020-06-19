package com.bt.scrumble.errorhandlers;

import com.bt.scrumble.api.v1.exception.RestTemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR;

@Component
public class MilestoneRestTemplateResponseErrorHandler implements ResponseErrorHandler {

  private static final Logger LOGGER =
      LoggerFactory.getLogger(MilestoneRestTemplateResponseErrorHandler.class);

  @Override
  public boolean hasError(ClientHttpResponse httpResponse) throws IOException {
    return (httpResponse.getStatusCode().series() == CLIENT_ERROR
        || httpResponse.getStatusCode().series() == SERVER_ERROR);
  }

  @Override
  public void handleError(ClientHttpResponse httpResponse) throws IOException {
    String milestoneNameInUseError = "already being used for another group or project milestone";
    BufferedReader reader = new BufferedReader(new InputStreamReader(httpResponse.getBody()));
    String httpBodyResponse = reader.lines().collect(Collectors.joining(""));
    if (httpBodyResponse.contains(milestoneNameInUseError) && httpBodyResponse.contains("title")) {
      throw new RestTemplateException("Sprint name in use");
    } else {
      LOGGER.error(httpBodyResponse);
      throw new RestTemplateException(httpBodyResponse);
    }
  }
}
