FROM gradle:6.3-jdk11
COPY . /scrumble
WORKDIR /scrumble
RUN gradle bootJar
CMD ["java","-jar","-Dspring.profiles.active=prod","build/libs/scrumbleApi.jar"]
