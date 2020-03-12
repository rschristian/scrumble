# Running the application

## Assumptions
* Spring Boot is configured to target Java 11.
* Docker has been used to create a container holding both Postgres and GitLab CE.


## Spring Boot API
A gradle wrapper has been included. From the packages/api directory, you can run the project with:

```
./gradlew bootJar
java -jar build/libs/scrumbleApi-0.0.1-SNAPSHOT.jar.
```

## Postgres
To install both Postgres there is a docker-compose.yml file included in the root folder of the project.

To create the container, run the following in the same directory as the file:
```
sudo docker-compose up
```
docker-compose.yml configures an admin user and password.
These credentials match up to the application.properties file.

## GitLab
There is an instance of GitLab on Cardiff University's OpenStack. The client id and scret for OAuth
used to configure this instance are in application.properties for demo and development purposes.

Once you have navigated to [GitLab](http://10.72.98.102) you will be able to register with your own name, email and password of choice.


