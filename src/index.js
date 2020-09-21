const express = require('express');
const userRouter = require('./routers/users');
const groupRouter = require('./routers/groups');
const userGroupRouter = require('./routers/userGroups');

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(groupRouter);
app.use(userGroupRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
