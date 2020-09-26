const express = require('express');
const router = new express.Router();

const { getAll, addUsersToGroup } = require('../services/userGroups');

router.get('/usergroup', async (req, res) => {
  await getAll(req, res);
});

router.post('/addtogroup', async (req, res) => {
  await addUsersToGroup(req, res);
});

module.exports = router;
