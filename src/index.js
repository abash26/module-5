const express = require('express');
const userRouter = require('./routers/users');
const groupRouter = require('./routers/groups');
const userGroupRouter = require('./routers/userGroups');
const Users = require('./models/users');
const Groups = require('./models/groups');
const userGroups = require('./models/userGroups');

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(groupRouter);
app.use(userGroupRouter);

Users.belongsToMany(Groups, {
  through: userGroups,
});

Groups.belongsToMany(Users, {
  through: userGroups,
});

app.listen(port, () => console.log(`listening on port ${port}`));
