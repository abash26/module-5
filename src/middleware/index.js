const logger = (req, res, next) => {
  const { url, body, query } = req;
  console.log(
    `Req url: ${url}\n` + `Req body: ${body}\n` + `Req query: ${query}`
  );
  next();
};

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send();
};

module.exports = {
  logger,
  logErrors,
};
