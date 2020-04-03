FROM gradle:4.8.1-jdk-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN ./gradlew bootJar

FROM openjdk:

RUN ls
COPY build/libs/scrumbleApi.jar scrumbleApi.jar
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
