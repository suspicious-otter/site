const dispatch = require("micro-route/dispatch");

const { app, handler } = require("./next.js");
const routes = require("./routes.json");

const createHandler = page => (req, res, { params, query }) =>
  app.render(req, res, page, { ...params, ...query });

module.exports = routes
  .reduce(
    (dispatcher, { method, path, page }) =>
      dispatcher.dispatch(path, method, createHandler(page)),
    dispatch()
  )
  .otherwise((req, res) => handler(req, res));
