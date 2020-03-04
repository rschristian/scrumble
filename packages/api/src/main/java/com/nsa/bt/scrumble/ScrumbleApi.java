package com.nsa.bt.scrumble;

import com.nsa.bt.scrumble.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableOAuth2Client
@EnableTransactionManagement
@EnableConfigurationProperties(AppProperties.class)
<<<<<<< HEAD
public class ScrumbleApi extends SpringBootServletInitializer {
=======
public class ScrumbleApi extends SpringBootServletInitializer
    {
>>>>>>> feat(authentication): Not finished functionality. But SB now generates JWTs instead of sessions and cookies. Upon successful OAuth authentication, SB redirects to a Preact component that grabs a short lived token from the URL. Next is to trade the short lived token for a long lived one and store it after secure transmission.

        public static void main(String[] args) throws Exception  {
                SpringApplication.run(ScrumbleApi.class, args);
        }

        @Bean
        public RestTemplate restTemplate(RestTemplateBuilder builder) {
            return builder.build();
        }

//        @Bean
//        @Profile("dev")
//        public FlywayMigrationStrategy cleanAndMigrateStrategy()
//            {
//                return flyway ->
//                {
//                    flyway.clean();
//                    flyway.migrate();
//                };
//            }
}
