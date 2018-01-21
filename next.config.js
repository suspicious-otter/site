const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const uuid = require("uuid/v4");

module.exports = {
  webpack(config, { dev }) {
    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          minify: !dev,
          cacheId: uuid(),
          runtimeCaching: [
            {
              handler: "networkFirst",
              urlPattern: /^https?.*/
            }
          ]
        })
      );
    }

    return config;
  }
};
