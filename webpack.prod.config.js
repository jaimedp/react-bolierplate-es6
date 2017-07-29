const webpack = require('webpack');
const base = require('./webpack.config');

const plugins = []
  .concat(base.plugins)
  .concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
  ]);

module.exports = Object.assign({}, base, {
  devtool: 'source-map',
  plugins: plugins
});
