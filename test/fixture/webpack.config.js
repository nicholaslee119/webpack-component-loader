import path from 'path';

import {injector, extractor} from 'webpack-component-loader-smarty-parser';

module.exports = {
  entry: './test/fixture/entry.js',
  resolveLoader: {
    alias: {
      'webpack-component-loader': path.join(__dirname, '../../index.js'),
    },
  },
  module: {
    rules: [
      {
        test   : /\.tpl?$/,
        exclude: /(node_modules)/,
        loader : 'webpack-component-loader',
        query  : {
          extractor : extractor,
          injector : injector,
          ext: '.tpl',
          srcPath : path.join(__dirname, '.'),
          builtJSPath : path.join(__dirname, '../assets/js'),
          builtCSSPath : path.join(__dirname, '../assets/css'),
          builtTemplatePath : path.join(__dirname, '../assets/templates'),
        },
      },
    ],
  },
}