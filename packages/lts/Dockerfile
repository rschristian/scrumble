FROM openjdk:13-alpine
WORKDIR /app
COPY ./build/libs/scrumbleLts.jar /app
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
