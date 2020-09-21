const userGroups = require('../models/userGroups');
const Groups = require('../models/groups');
const Users = require('../models/users');

async function getAll(req, res) {
  const users = await userGroups.findAll();
  res.status(200).json(users);
}

const addUsersToGroup = (groupId, userId) => {
  return Users.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log('user not found!');
        return null;
      }
      return Groups.findByPk(groupId).then((group) => {
        if (!group) {
          console.log('Tutorial not found!');
          return null;
        }

        user.addUsersToGroup(group);
        console.log(`>> added`);
        return user;
      });
    })
    .catch((err) => {
      console.log('>> Error while adding Tutorial to Tag: ', err);
    });
};

module.exports = {
  getAll,
  addUsersToGroup,
};
