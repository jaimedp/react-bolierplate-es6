module.exports = require('./webpack-builder')({
  devServer: true,
  debug: true,
  devtool: 'eval-source-map',
  hotReload: true,
  minimize: false,
  inlineCSS: true
});
