const Users = require('../models/users');
const Groups = require('../models/groups');
const userGroups = require('../models/userGroups');

Users.belongsToMany(Groups, {
  through: userGroups,
});

Groups.belongsToMany(Users, {
  through: userGroups,
});
