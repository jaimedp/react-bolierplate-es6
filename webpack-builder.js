var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = function (options) {
  var plugins = [];
  var loaders = [];
  var plugins = [];

  if (options.minimize) {
    plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
      new webpack.NoErrorsPlugin()
    );
  }

  if (options.hotReload) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  if (options.inlineCSS) {
    loaders.push(
      { test: /\.css$/, exclude: /node_modules/, loader: 'style!css!postcss' }
    );
  } else {
    loaders.push(
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
    );

    plugins.push(
      new ExtractTextPlugin('css/site-[hash].css')
    );
  }

  function addEntryPoint(entryPoint) {
    var entry = ['babel-polyfill', entryPoint];
    if (options.hotReload) {
      entry = [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
      ].concat(entry);
    }
    return entry;
  }

  return {
    entry: {
      app: addEntryPoint('./src/js/main.js'),
    },

    output: {
      path: options.devServer ? path.join(__dirname, 'src') : 'public',
      filename:   'js/[name]-[hash].js',
      publicPath: ''
    },

    devServer: {
      contentBase: path.join(__dirname, 'src')
    },

    resolve: {
      extensions: ['', '.js', '.jsx'],
      fallback: 'public'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.devServer ? 'development' : 'production')
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks: ['app']
      })
    ].concat(plugins),

    module: {
      preLoaders: [
        { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
      ],
      loaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?compact=false'] },
        { test: /\.(gif|ico|jpg|png|svg)$/, exclude: /(node_modules)/, loader: 'url?limit=3192&name=./img/[hash].[ext]' }
      ].concat(loaders)
    },

    postcss: function (webpack) {
      return [
        require('postcss-import')({ addDependencyTo: webpack }),
        require('precss'),
        require('autoprefixer')
      ];
    },

    devtool: options.devtool,

    debug: options.debug
  };
}
