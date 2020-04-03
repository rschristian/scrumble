FROM openjdk:13-jdk-alpine
COPY ./build/libs/scrumbleApi.jar /scrumbleApi.jar
WORKDIR /
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
