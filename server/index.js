require("now-env");

const { app } = require("./next.js");
const router = require("./router.js");

async function setup(handle) {
  await app.prepare();
  return handle;
}

module.exports = setup(router);
