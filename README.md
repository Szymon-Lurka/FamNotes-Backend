# Backend for [FamNotes](https://github.com/Szymon-Lurka/FamNotes) app

Backend for the FamNotes application. Supports user registration and login. Add groups and notes to groups.

## Technologies

- Node v14.15.1
- Nest.js v7.5.4
- Typescript

## How to run this project

### You need SQL database (you can run your database in MAMP for example)

- Then configure ormconfig.json

```
{
    "type":"mysql",
    "host": <your host>
    "port": <your host port / default is 3306>
    "username": <your database login>
    "password": <your database password>
    "database": <your database name>
    "entities":["dist/**/*.entity{.ts,.js}"],
    "bigNumberStrings":false,
    "logging":true, // true if u want to see SQL commands in terminal
    "synchronize":true
}
You can find this informations in for example MAMP
```

### Project setup

```
npm install
```

### Run your project

```
npm start build
or
nest start
```

### Run your project with hot-reload

```
nest start --watch
```
