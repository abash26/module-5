const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const {
  getAll,
  getById,
  create,
  update,
  remove,
  login,
} = require('../services/users');

router.get('/users/:id', auth, async (req, res) => {
  await getById(req, res);
});

router.post('/users/login', async (req, res) => {
  await login(req, res);
});

// /users?limit=10&login=J
router.get('/users', auth, async (req, res) => {
  await getAll(req, res);
});

router.post('/users', auth, async (req, res) => {
  await create(req, res);
});

router.patch('/users/:id', auth, async (req, res) => {
  await update(req, res);
});

router.delete('/users/:id', auth, async (req, res) => {
  await remove(req, res);
});

module.exports = router;
