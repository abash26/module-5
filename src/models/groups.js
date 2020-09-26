const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const faker = require('faker');

const Groups = sequelize.define('groups', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: { is: /^\w{3,}$/ },
  },
  permissions: {
    allowNull: false,
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

(async () => {
  await sequelize.sync();
  await Groups.create({
    name: faker.name.jobDescriptor(),
    permissions: ['WRITE', 'READ'],
  });
})();

module.exports = Groups;
