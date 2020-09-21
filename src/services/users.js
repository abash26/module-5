const Users = require('../models/users');
const { Op } = require('sequelize');
const Groups = require('../models/groups');

async function getAll(req, res) {
  const users = await Users.findAll({
    where: {
      login: { [Op.like]: `%${req.query.login}%` },
    },
    order: [['login', 'ASC']],
    limit: req.query.limit,
  });
  res.status(200).json(users);
}

async function getById(req, res) {
  const user = await Users.findByPk(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('404 - Not found');
  }
}

async function create(req, res) {
  if (req.body.id) {
    res.status(400).send('Bad request: ID should not be provided.');
  } else {
    await Users.create(req.body);
    res.status(201).end();
  }
}

async function update(req, res) {
  await Users.update(req.body, { where: { id: req.params.id } });
  res.status(200).end();
}

async function remove(req, res) {
  await Users.update({ isdeleted: true }, { where: { id: req.params.id } });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
