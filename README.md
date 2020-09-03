# Scrumble

This was a group project we were given in the second semester of third year of university. The goal of this project was to create what is essentially a wrapper around GitLab Community Edition's issue boards, and possibly leaving it open to later incorporate GitHub as well. BT is a heavy user of the polyrepo design, and as such, they are quite fragmented (though, this is the goal and not a bad thing). However, this does create a few issues from a management point of view, and it was our task to create a unified view of the issue boards that could span over multiple individual repositories.

The initial goals of the project given to us by the client can be found [here](initial-backlog.csv).

Please see [running.md](running.md) for instructions on how to build the project in various environments.

## Built With

* [Preact](https://preactjs.com/) - Web Library used to Build the Client
  * [TypeScript](https://www.typescriptlang.org/) - Language used
  * [Tailwind](https://tailwindcss.com) - Utility-First Styling Framework
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
* [Spring Boot](https://spring.io/projects/spring-boot/) - Web Framework used to Build the API
  * [Java](https://www.oracle.com/java) - Language used
  * [PostgreSQL](https://www.postgresql.org/) - Database System used for Persistence 
  * [Gradle](https://gradle.org/) - Dependency Management Tool
* [GitLab Community Edition](https://about.gitlab.com/install/ce-or-ee/) - Data ingestion source

## Authors

* **Ryan Christian** - *Front End, Architecture, Tooling* - [Ryan Christian](https://github.com/RyanChristian4427)
* **Lauren Heymer** - *Front End, Spring Boot API, GitLab Administration* - [Lauren Heymer](https://github.com/renHeymer)
* **James Buckland**

## Acknowledgments

* Thanks to the BT for giving us this project to work on, and allowing us to use this as part of our portfolios.
