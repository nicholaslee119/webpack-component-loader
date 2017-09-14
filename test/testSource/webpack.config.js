
import path from 'path';

module.exports = {
  entry: './entry.js',
  resolveLoader: {
    alias: {
      'webpack-component-loader': path.join(__dirname, '../index.js'),
    },
  },
  module: {
    rules: [
      { test: /\.tpl$/, use: 'webpack-component-loader!smarty-ast-loader' }
    ]
  }
}