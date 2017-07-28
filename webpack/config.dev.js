const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

module.exports = {
  entry: {
    'mason-blueprint': './src/mason-blueprint.js'
    , app: './src/app.js'
  }

  , devtool: 'inline-source-map',

  output: {
    filename: '[name].js'
    , path: path.resolve(__dirname, '../test')
    , libraryTarget: 'umd'
  }

  , devServer: {
    port: 8080
    , historyApiFallback: {
      index: './src/index.html'
    }
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
	  new HtmlWebpackPlugin({
      filename: 'index.html'
      , template: './src/index.html'
      , inject: 'body'
    }),
  ]
};
