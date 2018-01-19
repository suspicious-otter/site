const next = require("next");

const { NODE_ENV = "development" } = process.env;

const dev = NODE_ENV !== "production";

const app = next({ dir: ".", dev });

exports.app = app;
exports.handler = app.getRequestHandler();
