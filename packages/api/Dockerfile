FROM openjdk:13-alpine
COPY build/libs/scrumbleApi.jar /scrumbleApi.jar
WORKDIR /
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
