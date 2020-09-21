const Groups = require('../models/groups');
const Users = require('../models/users');

async function getAll(req, res) {
  const groups = await Groups.findAll();
  res.status(200).json(groups);
}

async function getById(req, res) {
  const group = await Groups.findByPk(req.params.id);
  if (group) {
    res.status(200).json(group);
  } else {
    res.status(404).send('404 - Not found');
  }
}

async function create(req, res) {
  if (req.body.id) {
    res.status(400).send('Bad request: ID should not be provided.');
  } else {
    await Groups.create(req.body);
    res.status(201).end();
  }
}

async function update(req, res) {
  await Groups.update(req.body, { where: { id: req.params.id } });
  res.status(200).end();
}

async function remove(req, res) {
  await Groups.destroy({ where: { id: req.params.id } });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
