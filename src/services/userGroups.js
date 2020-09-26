const userGroups = require('../models/userGroups');
const Groups = require('../models/groups');
const Users = require('../models/users');
const sequelize = require('../db');

async function getAll(req, res) {
  try {
    const users = await userGroups.findAll();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
}

// add multiple users to group (body {"users": [1, 2],"group": 1})
async function addUsersToGroup(req, res) {
  const { users, group } = req.body;
  for (var i = 0; i < users.length; i++) {
    try {
      await sequelize.transaction(async (t) => {
        const user = await Users.findByPk(users[i], { transaction: t });
        await user.addGroup(group, { transaction: t });
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
  res.status(200).json();
}

module.exports = {
  getAll,
  addUsersToGroup,
};
