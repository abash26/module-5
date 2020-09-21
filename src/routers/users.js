const express = require('express');
const router = new express.Router();

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/users');

router.get('/users/:id', async (req, res) => {
  await getById(req, res);
});

// /users?limit=10&login=J
router.get('/users', async (req, res) => {
  await getAll(req, res);
});

router.post('/users', async (req, res) => {
  await create(req, res);
});

router.patch('/users/:id', async (req, res) => {
  await update(req, res);
});

router.delete('/users/:id', async (req, res) => {
  await remove(req, res);
});

module.exports = router;
