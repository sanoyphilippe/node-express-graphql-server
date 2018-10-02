import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import Sequelize from 'sequelize';
import Db from './db';

// for some reason object destructuring does not work in the case for this usage
// do not destructure.
const Op = Sequelize.Op;

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
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        text: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        if (args.text && args.text.length > 0) {
          // using whitespace as a a delimiter
          const keywords = args.text.trim().split(' ').map(word => `${word}%`);
          return Db.models.user.findAll({
            where: {
              [Op.or]: [{ firstName: { [Op.iLike]: { [Op.any]: keywords } } },
                { lastName: { [Op.iLike]: { [Op.any]: keywords } } }],
            },
          });
        }
        return Db.models.user.findAll({ where: args });
      },
    },
    properties: {
      type: new GraphQLList(Property),
      args: {
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
        text: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        if (args.text && args.text.length > 0) {
          // we use space as a delimiter
          const keywords = args.text.trim().split(' ').map(word => `${word}%`);
          return Db.models.property.findAll({
            where: {
              [Op.or]: [{ city: { [Op.iLike]: { [Op.any]: keywords } } },
                { street: { [Op.iLike]: { [Op.any]: keywords } } },
                { zip: { [Op.iLike]: { [Op.any]: keywords } } },
                { state: { [Op.iLike]: { [Op.any]: keywords } } },
                Sequelize.where(
                  Sequelize.cast(Sequelize.col('property.rent'), 'text'),
                  { [Op.iLike]: { [Op.any]: keywords } },
                )],
            },
          });
        }
        return Db.models.property.findAll({ where: args });
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
