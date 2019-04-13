const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['react-hot-loader/patch', './src/js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[hash:8].js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.txt$/, use: 'raw-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' }
              },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.ejs' }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : 'css/[name]-[hash:8].css'
    })
  ],

  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true
  },

  devtool: isDev ? 'eval-source-map' : 'source-map'
};
