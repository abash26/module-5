const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const auth = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) {
      res.status(401).send();
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: { id: decoded._id, token: token },
    });
    if (!user) throw new Error();
    next();
  } catch (error) {
    res.status(403).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
