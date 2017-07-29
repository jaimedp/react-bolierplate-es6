const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name]-[hash].js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /(node_modules)/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('precss'),
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/site-[hash].css'),
    new HtmlWebpackPlugin({ title: 'Custom template', template: './src/index.ejs' }),
  ],

  devtool: 'eval-source-map'
};
