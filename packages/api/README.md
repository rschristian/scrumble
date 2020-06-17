# Scrumble - API

This is the backend/server for Scrumble, and it is what communicates with a GitLab instance to provide the required data for the front end. 

This is written in Java using [Spring Boot](https://spring.io/projects/spring-boot), an opinionated view of the Spring platform used to create stand-alone, production-grade Spring based Applications that you can "just run". Our DBMS of choice is [PostgreSQL](https://www.postgresql.org/), the world's most advanced open source relational database, with [Flyway](https://flywaydb.org/) supplying our database migration system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Java v11
PostgreSQL (Optional)
Flyway (Optional)
Docker/Compose (Optional)
```

### Running

A Docker-Compose file is provided for easily setting up the database, should you choose to use it. If you do, run: 

```
docker-compose up --build -d
```

If you choose to use some other Postgres source, you will need to edit the [application.properties](src/main/resources/application.properties) file(s) and provide your database configuration details.

To run database migrations, run the following command:

```
docker run --rm \
    -v "$PWD/src/main/resources/db-migrations/:/flyway/sql" \
    -v "$PWD:/flyway/conf" \
    --network="api_default" \
    flyway/flyway:latest-alpine migrate
```

The Docker image built for Flyway will run "flyway" without any arguments, making the container act like a normal CLI. However, that very large command is necessary upon every use. It is therefore recommend creating an alias in a `.bashrc` or `.zshrc`, so the tool can be just called with `flyway-cli [command]`. An example of this alias:

```
alias flyway-cli='docker run --rm \
    -v "$PWD/src/main/resources/db-migrations/:/flyway/sql" \
    -v "$PWD:/flyway/conf" \
    --network="api_default" \
    flyway/flyway:latest-alpine';
```

This Flyway container uses a configuration file [flyway.conf](flyway.conf), which will need to be edited if you are not using the Docker-Compose database, but your own Postgres source.

Once you have the database prepared, the API server can be started with the following commands:

```
./gradlew bootRun
```

This will run the application on port 8000 using the "dev" profile. 

Alternatively, you can run the server from a Docker container instead. Build the Jar file by running:

```
./gradlew bootJar
```

Then build the Docker container by running:

```
docker build -t scrumbleapi .
```

Then run the container with:

```
docker run -p 8000:8000 --network="api_default" scrumbleapi
```

This will also run the application on port 8000, but will use the "prod" profile instead.

#### Profiles

Two profiles are provided for this application. "dev", the default, expects the database to publicly accessible on the system and keeps everything running on localhost. "prod", on the other hand, expects to be ran as a container, where it can network with the database, and it uses our domain for redirects.

### Code Style

All formatting is done with the Google-Java-Format, which we used as an integration with our IDEs, rather than installing the tool as a CLI. 

The linter CheckStyle is also used, and our config for it can be found [here](config/checkstyle/checkstyle.xml). Checkstyle can be ran with

```
./gradlew checkstyleMain
```

## Built With

* [Spring Boot](https://spring.io/projects/spring-boot) - An opinionated view of the Spring platform used to create stand-alone, production-grade Spring based Applications that you can "just run"
* [Flyway](https://flywaydb.org/) - A database migration tool
* [PostgreSQL](https://www.postgresql.org/) - The world's most advanced open source relational database

## Authors

* **Ryan Christian** - *Code Quality Review* - [Ryan Christian](https://github.com/RyanChristian4427)
* **Lauren Heymer** - *Authentication, Security, Architecture, Database & GitLab Administrator, Majority of Features* - [Lauren Heymer](https://github.com/renHeymer)
* **James Buckland** - *Issue Completion Time Estimation, Editing/Creating GitLab Issues*
