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

### Installing

A step by step series of examples that tell you how to get a development env running.

Note: these instructions are tailor made for Linux systems.

First we need to install the node_modules.
So change to the directory created in your system, after cloning this repository.

```
cd node-express-graphql-server
npm install
```

Next we need to configure the config file.
The config file is located in `/config/default.json`
It contains the following default values.
```
{
  "POSTGRES_URI": "postgres://onerent:12345@localhost:5432/onerent",
  "ENABLE_FIXTURES": false,
  "APP_PORT": 3000
}
```

End with an example of getting some data out of the system or using it for a little demo

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* **Philippe Oscar Sanoy** - *Scoured through various sources of information to build this*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* Anyone whose code was used
* Onerent - for giving me this test
* Google - for helping me find learning resources
* Pldt - for my internet connection
* To anyone else who is reading this
