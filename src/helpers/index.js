const sequelize = require('../db');
const Users = require('../models/users');
const Groups = require('../models/groups');

const addUsers = async () => {
  const t = await sequelize.transaction();
  try {
    const user = await Users.create(
      {
        login: 'Bart',
        password: 'test1234',
        age: 25,
      },
      { transaction: t }
    );

    await user.addSibling(
      {
        login: 'Lisa',
        password: 'test1234',
        age: 23,
      },
      { transaction: t }
    );
    await t.commit();
  } catch (error) {
    await t.rollback();
  }
};

const addGroups = async () => {
  const t = await sequelize.transaction();
  try {
    const group = await Groups.create(
      {
        name: 'editor',
        permissions: ['WRITE', 'READ'],
      },
      { transaction: t }
    );

    await group.addSibling(
      {
        name: 'admin',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
      },
      { transaction: t }
    );
    await t.commit();
  } catch (error) {
    await t.rollback();
  }
};

module.exports = {
  addUsers,
  addGroups,
};
