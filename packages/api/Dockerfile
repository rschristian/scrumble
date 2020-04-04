FROM openjdk:13-alpine
COPY scrumbleApi.jar /scrumbleApi.jar
WORKDIR /
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
