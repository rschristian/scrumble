# Preact-Typescript-MobX-Template

This is a template project used to bootstrap a new Preact App. This is built using the Preact-CLI.

This template includes routing, global state management, Typescript, SCSS (Bulma, to be specific) as well as easy API requests with Axios and JWT management.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Node
NPM
```

### Running

Firstly, you will need to install the project dependencies. From the project root, run:

```
npm run install
```

Once the dependencies are installed, to start a dev server, run:

```
npm run serve:dev
```

...or for a production server:

```
npm run serve:prod
```

To build the app with docker (so you don't need to install Node or NPM):

```
docker run --rm -v "$PWD:/volume" -w /volume -it node:12.16.1-alpine npm run dockerbuild
```

## Code Style

The code is formatted to the linting rules found in [.eslintrc.js](.eslintrc.js).

### Run Linter

```
npm run lint
```

## Built With

-   [Preact](https://reactjs.org/) - Library Used to Build Interface
    -   [Typescript](https://www.typescriptlang.org/) - A Typed Superset (sorta) of JavaScript
    -   [MobX](https://mobx.js.org/README.html) - Global State Management Tool
    -   [NPM](https://www.npmjs.com/) - Dependency Management Tool
