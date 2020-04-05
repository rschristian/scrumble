# Scrumble - API


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Java
Docker-Compose
```

### Running

To aid in the process of starting the server, a Docker Compose file is provided for setting up the database. From the project root, run:

```
docker-compose up --build -d
```

This will start the Postgres DB in the background.

Build the Dockerfile for running the API with:

```
docker build -t scrumbleapi .
```

Then run with:

```
docker run -p 8000:8000 --network="api_default" scrumbleapi
```
