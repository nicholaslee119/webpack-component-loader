const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const {extractor, addScopeAttr, injector} = require('webpack-component-loader-smarty-parser');

module.exports = {
  entry: {
    'pageC': path.resolve(__dirname, '../fixture/pageC.entry.js'),
    'pageE': path.resolve(__dirname, '../fixture/pageE.entry.js'),
  },
  output: {
    path: path.resolve(__dirname, '../assets/'),
    publicPath: '/assets/',
    filename     : 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  resolveLoader: {
    alias: {
      'webpack-component-loader': path.resolve(__dirname, '../../index.js'),
    },
  },
  module: {
    rules: [
      {
        test   : /\.tpl?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'webpack-component-loader',
            options: {
              isCodeSplit: false,
              extractor,
              injector,
              addScopeAttr,
              ext: '.tpl',
              srcPath : path.resolve(__dirname, '../fixture'),
              builtTemplatePath : path.resolve(__dirname, '../assets/templates'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        enforce: 'post',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:  'css/[name].css',
      // allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/commons.js',
    })
  ]
}