const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const y = require('dotenv').config({ path: './config/dev.env' });

const userRouter = require('./routers/users');
const groupRouter = require('./routers/groups');
const userGroupRouter = require('./routers/userGroups');
const Users = require('./models/users');
const Groups = require('./models/groups');
const userGroups = require('./models/userGroups');
const { logErrors, logger } = require('./middleware');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('../swagger.json');

const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  morgan('combined', {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(promise, reason);
});

app.use(logger);
app.use(logErrors);

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
