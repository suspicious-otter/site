require("now-env");

const microNext = require("micro-next");
const routes = require("../data/routes.json");

module.exports = microNext({
  routes,
  nextConfig: {
    dir: ".",
    dev: process.env.NODE_ENV !== "production"
  }
});
