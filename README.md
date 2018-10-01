# node-express-graphql

A sample web server created using NodeJS with Express framework, GraphQL, Sequelize, and utilizing Postgres for the database.

## Getting Started

Clone this repository on your local system
```
git clone https://github.com/sanoyphilippe/node-express-graphql-server.git
```

### Prerequisites

You must have npm and nodejs installed on your local system
See https://nodejs.org for installation instructions

Also you must have a Postgres db already setup.
See https://www.postgresql.org for details about postgres

### Installing

A step by step series of examples that tell you how to get a development env running.

Note: these instructions are tailor made for Linux systems.

First we need to install the node_modules.
So change to the directory created in your system, after cloning this repository.

```
cd node-express-graphql-server
npm install
```
#### Config
Next we need to configure the config file.
The config file is located in `/config/default.json`
It contains the following default values.
```
{
  "POSTGRES_URI": "postgres://onerent:12345@localhost:5432/onerent",
  "ENABLE_FIXTURES": false,
  "ENABLE_GRAPHIQL": false,
  "APP_PORT": 3000
}
```
`POSTGRES_URI` defines the URI for our postgres db

`ENABLE_FIXTURES` is an optional feature to generate some test data on your db (the generated data uses uuidv4 for the primaryKey)

`ENABLE_GRAPHIQL` is an optional feature to enable graphiql on the /search endpoint.

`APP_PORT` is simply the port in which the app will run on your system.

This config file is optional, as long as you have environment variables with the same
name as the ones defined in the config file. The app will first look for an env variable of that name, if
it does not find an environment variable of that name then it will refer to the config file for the value.
For more details on the config files see [here](https://github.com/lorenwest/node-config/wiki/Configuration-Files) 

#### Running the app

Now after doing all of the above, simply run the command
```
npm start
```

If you're running the app on your local system and you just used the default values, open up your web browser and go to the following url `http://localhost:3000/search`

#### GRAPHIQL

This app optionally uses `graphiql` which gives us some nice interface to test our API

If you enabled graphiql via setting `ENABLE_GRAPHIQL` to true, then on the left hand side editor you can place the following query
```
{
  users {
    id
    firstName
    lastName
    properties {
      street
      city
      rent
    }
  }
}
```
You should now see the results on the right hand side of the screen, this is what is returned to clients when they query your graphql end-point.

At the top right corner there is a button `docs`, clicking it would show some more info regarding the schema for this end-point.

## Authors

* **Philippe Oscar Sanoy** - *Scoured through various sources of information to build this*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Anyone whose code was used
* Onerent - for giving me this test
* Google - for helping me find learning resources
* Pldt - for my internet connection
* To anyone else who is reading this
