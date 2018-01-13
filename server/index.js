require("now-env");

const { parse } = require("url");
const next = require("next");

const { NODE_ENV, PORT = 3001 } = process.env;

const dev = NODE_ENV !== "production";

const app = next({ dir: ".", dev });
const handle = app.getRequestHandler();

async function main(req, res) {
  const url = parse(req.url, true);
  return handle(req, res, url);
}

async function setup(handler) {
  await app.prepare();
  return handler;
}

module.exports = setup(main);
