import path from 'path';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        use: [
          {
            loader: 'webpack-component-loader',
            options: {
              extractor : extractor,
              injector : injector,
              ext: '.tpl',
              srcPath : path.join(__dirname, '.'),
              builtJSPath : path.join(__dirname, '../assets/js'),
              builtCSSPath : path.join(__dirname, '../assets/css'),
              builtTemplatePath : path.join(__dirname, '../assets/templates'),
            },
          },
          // ExtractTextPlugin.extract({
          //   fallback: "style-loader",
          //   use: 'css-loader'
          // })
        ],
      },
      // {
      //   test: /\.tpl$/,
      //   enforce: "post",
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: 'css-loader'
      //   })
      // }
    ],
  },
  plugins: [
    new ExtractTextPlugin("./styles.css"),
  ]
}