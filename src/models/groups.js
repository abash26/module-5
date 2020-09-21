const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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

Groups.sync().then(() => {
  Groups.create({
    name: 'editor',
    permissions: ['EDIT'],
  });
});

module.exports = Groups;
