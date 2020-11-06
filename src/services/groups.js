const Groups = require('../models/groups');
const userGroups = require('../models/userGroups');

async function getAll(req, res) {
  try {
    const groups = await Groups.findAll();
    res.status(200).send(groups);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function getById(req, res) {
  try {
    const group = await Groups.findByPk(req.params.id);
    res.status(200).send(group);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function create(req, res) {
  if (req.body.id) {
    res.status(400).send('Bad request: ID should not be provided.');
  }
  try {
    const group = await Groups.create(req.body);
    res.status(201).send(group);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function update(req, res) {
  try {
    const group = await Groups.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(group);
  } catch (e) {
    res.status(400).send(e);
  }
}

async function remove(req, res) {
  try {
    const group = await Groups.destroy({ where: { id: req.params.id } });
    await userGroups.destroy({
      where: { groupId: req.params.id },
    });
    res.sendStatus(200).send(group);
  } catch (e) {
    res.sendStatus(400).send(e);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
