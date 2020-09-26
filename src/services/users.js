const Users = require('../models/users');
const { Op } = require('sequelize');
const userGroups = require('../models/userGroups');

async function getAll(req, res) {
  try {
    const users = await Users.findAll({
      where: {
        login: { [Op.like]: `%${req.query.login}%` },
      },
      order: [['login', 'ASC']],
      limit: req.query.limit,
    });
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function getById(req, res) {
  try {
    const user = await Users.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function create(req, res) {
  if (req.body.id) {
    res.status(400).send('Bad request: ID should not be provided.');
  }
  try {
    const user = await Users.create(req.body);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function update(req, res) {
  try {
    const user = await Users.update(req.body, { where: { id: req.params.id } });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function remove(req, res) {
  try {
    const user = await Users.update(
      { isdeleted: true },
      { where: { id: req.params.id } }
    );
    await userGroups.destroy({ where: { userId: req.params.id } });
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
