import path from 'path';

import {extractor} from 'webpack-component-loader-smarty-parser';

module.exports = {
  entry: './test/fixture/entry.js',
  resolveLoader: {
    alias: {
      'webpack-component-loader': path.join(__dirname, '../../index.js'),
    },
  },
  output: {
    path: path.resolve(__dirname, '..', 'assets', 'js'),
    filename: "bundle.js",
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test   : /\.tpl?$/,
        exclude: /(node_modules)/,
        loader : 'webpack-component-loader',
        query  : {
          extractor : extractor,
          ext: '.tpl',
          srcPath : path.resolve(__dirname, '.'),
          builtTemplatePath : path.resolve(__dirname, '../assets/templates'),
        },
      },
    ],
  },
}