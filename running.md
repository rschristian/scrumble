# Scrumble

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes, as well as (roughly) describe the production deployment process.

### Prerequisites

```
NodeJS v12
NPM
Java v11
Docker (optional)
PostgreSQL (optional)
```

### Running

#### API Server

A Docker-Compose file is included in the project for easily setting up the database, should you choose to use it. If you do, run from the root repository directory: 

```
docker-compose -f packages/api/docker-compose.yml up --build -d
```

If you choose to use some other Postgres source, you will need to edit the [application.properties](packages/api/src/main/resources/application.properties) file and provide your database configuration details.

Once you have the database prepared, the API server can be started with the following commands:

```
cd packages/api
./gradlew bootJar
java -jar build/libs/scrumbleApi.jar
```

#### Front End Client

To build the front end for a production build, use the following commands:

```
cd packages/web-app
npm install
npm run build
```

The output can be found in [build](packages/web-app/build). You can use this in a static site generator like Netlify or put it behind Nginx.

To run a local server, you can use `npm run serve:prod` for a production-like server, or `npm run serve:dev` for a development one. Both will be accessible with [this address](http://localhost:3000).

#### GitLab

As the API consumes data from a GitLab source, a GitLab instance (with a valid user account) is necessary.

To aid in this, a GitLab instance has been set up at [gitlab.ryanchristian.dev](https://gitlab.ryanchristian.dev). The Client ID and Secret for OAuth used to configure this instance can be found in [application.properties](packages/api/src/main/resources/application.properties).

Navigate to the instance in your browser and register for a new account using your own name, email, and password of your choice. You will need it in order to use this application.
