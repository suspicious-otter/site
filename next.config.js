const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const uuid = require('uuid/v4');

module.exports = {
  webpack(config, { dev }) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== 'UglifyJsPlugin';
    });

    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          minify: !dev,
          cacheId: uuid(),
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/
            }
          ]
        }),
        new BabiliPlugin()
      );
    }

    return config;
  }
};
