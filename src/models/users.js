const { DataTypes } = require('sequelize');
const { addUsers } = require('../helpers');
const sequelize = require('../db');

const Users = sequelize.define('users', {
  login: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: { is: /^\w{3,}$/ },
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^(?=.*[0-9]{1,})(?=.*[a-zA-Z]{1,})([a-zA-Z0-9]+)$/,
    },
  },
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: { min: 4, max: 130 },
  },
  isdeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Users.sync().then(() => {
  addUsers();
});

module.exports = Users;
