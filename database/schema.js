import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import Db from './db';

const Property = new GraphQLObjectType({
  name: 'Property',
  description: 'this is a property',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve(property) {
        return property.id;
      },
    },
    street: {
      type: GraphQLString,
      resolve(property) {
        return property.street;
      },
    },
    city: {
      type: GraphQLString,
      resolve(property) {
        return property.city;
      },
    },
    state: {
      type: GraphQLString,
      resolve(property) {
        return property.state;
      },
    },
    zip: {
      type: GraphQLString,
      resolve(property) {
        return property.zip;
      },
    },
    rent: {
      type: GraphQLFloat,
      resolve(property) {
        return property.rent;
      },
    },
  }),
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This is a user',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve(user) {
        return user.id;
      },
    },
    firstName: {
      type: GraphQLString,
      resolve(user) {
        return user.firstName;
      },
    },
    lastName: {
      type: GraphQLString,
      resolve(user) {
        return user.lastName;
      },
    },
    properties: {
      type: new GraphQLList(Property),
      resolve(user) {
        return user.getProperties();
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'a query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLString,
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        return Db.models.user.findAll({ where: args });
      },
    },
    properties: {
      type: new GraphQLList(Property),
      args: {
        id: {
          type: GraphQLString,
        },
        street: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        state: {
          type: GraphQLString,
        },
        zip: {
          type: GraphQLString,
        },
        rent: {
          type: GraphQLFloat,
        },
      },
      resolve(root, args) {
        return Db.models.property.findAll({ where: args });
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
