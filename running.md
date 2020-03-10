# Running the application 

## Spring Boot API
A gradle wrapper has been included. From the packages/api directory, you can run the project with:

```
./gradlew bootJar
java -jar build/libs/scrumbleApi-0.0.1-SNAPSHOT.jar.
```

## Docker
To install both Postgres and GitLab CE there is a docker-compose.yml file included in the project.

To create the container, run the following in the same directory as the file:
```
sudo docker-compose up
```
docker-compose.yml configures an admin user and password.
These credentials match up to the application.properties file.

## GitLab CE
The very first time you visit GitLab, you will be asked to set up the admin password. After you change it, you can login with username root and the password you set up.

Instructions to add Scrumble as an OAuth application on GitLab can be found [here](https://docs.gitlab.com/ee/integration/oauth_provider.html).
Make sure you follow instructions for the admin area, rather than configuring OAuth for a single user profile.

Set the callback URL as http://localhost:8000/login/oauth2/code/gitlab.

GitLab will give you an application ID and a secret. Assign these values to application-dev.properties as follows:

```
spring.security.oauth2.client.registration.gitlab.client-id=<application ID>
spring.security.oauth2.client.registration.gitlab.client-secret=<secret>
```
