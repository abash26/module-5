const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const { getAll, addUsersToGroup } = require('../services/userGroups');

router.get('/usergroup', auth, async (req, res) => {
  await getAll(req, res);
});

router.post('/addtogroup', auth, async (req, res) => {
  await addUsersToGroup(req, res);
});

module.exports = router;
