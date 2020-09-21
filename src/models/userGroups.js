const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const userGroups = sequelize.define('userGroups', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'groups',
      key: 'id',
    },
  },
});

module.exports = userGroups;
