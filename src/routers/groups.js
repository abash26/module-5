const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/groups');

router.get('/groups/:id', auth, async (req, res) => {
  await getById(req, res);
});

router.get('/groups', auth, async (req, res) => {
  await getAll(req, res);
});

router.post('/groups', auth, async (req, res) => {
  await create(req, res);
});

router.patch('/groups/:id', auth, async (req, res) => {
  await update(req, res);
});

router.delete('/groups/:id', auth, async (req, res) => {
  await remove(req, res);
});

module.exports = router;
