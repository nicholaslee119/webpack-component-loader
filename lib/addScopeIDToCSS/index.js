// this is a entry of webpack-loader
const postcss = require('postcss');
var loaderUtils = require('loader-utils')
const scopeId = require('./scopeIdPlugin');

module.exports = function(css) {
  this.cacheable();
  const cb = this.async();
  const query = loaderUtils.getOptions(this) || {};
  const id = query.scopeID;

  postcss([scopeId({ id })])
    .process(css)
    .then(res=>{
      cb(null, res.css);
    })
}