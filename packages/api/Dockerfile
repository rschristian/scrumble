FROM openjdk:13-alpine
WORKDIR /app
COPY ./build/libs/scrumbleApi.jar /app
CMD ["java","-jar","-Dspring.profiles.active=prod","scrumbleApi.jar"]
