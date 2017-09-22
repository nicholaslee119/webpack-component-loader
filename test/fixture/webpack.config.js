import path from 'path';

import injector from '../util/injector.normal';

function templateExtractor (source) {
  var included = source.match(/\'.*\'/g);
  if(!included) return null;
  var res = [];
  included.forEach(function (element) {
    res.push(element.slice(1,element.length-1));
  })
  return res;
}

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
          extractor : templateExtractor,
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