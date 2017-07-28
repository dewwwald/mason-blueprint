const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: {
    'mason-blueprint': './src/mason-blueprint.js'
  }

  , output: {
    filename: '[name].js'
    , path: path.resolve(__dirname, '../build')
    , libraryTarget: 'umd'
  }

  , module: {
    loaders: [{
      test: /\.js$/
      , loader: 'babel-loader'
      , query: {
        cacheDirectory: 'babel_cache'
        , presets: ['es2015']
      }
    }]
  }

  , plugins: [
    new UglifyJSPlugin()
  ]
};
