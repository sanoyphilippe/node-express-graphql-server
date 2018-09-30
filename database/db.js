import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';
import config from '../configuration/config';

const conn = new Sequelize(config.get('POSTGRES_URI'));

// Defining User table
const User = conn.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Defining Property table
const Property = conn.define('property', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  street: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
  rent: {
    type: Sequelize.FLOAT,
  },
});

// table relationships
User.hasMany(Property);
Property.belongsTo(User);

// optional fixtures
if (config.get('ENABLE_FIXTURES')) {
  conn.sync({ force: true }).then(() => {
    _.times(10, () => User.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
    }).then(user => user.createProperty({
      street: Faker.address.streetAddress(),
      city: Faker.address.city(),
      state: Faker.address.state(),
      zip: Faker.address.zipCode(),
      rent: Faker.finance.amount(),
    })));
  });
}

export default conn;
