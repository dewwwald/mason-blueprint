const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

module.exports = {
  entry: {
    main: './src/index.js',
    babel: 'babel-polyfill'
  },

  devtool: 'inline-source-map',

  output: {
    filename: 'mason-blueprint.js',
    path: path.resolve(__dirname, 'test'),
    libraryTarget: 'umd',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['es2015']
      }
    }],
  },

  plugins: [
	  new HtmlWebpackPlugin({})
  ]
};