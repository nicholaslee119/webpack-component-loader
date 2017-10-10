// this is a entry of webpack-loader
const postcss = require('postcss');
var loaderUtils = require('loader-utils')
const scopeId = require('./scopeIdPlugin');

module.exports = function(css) {
  this.cacheable();
  const cb = this.async();
  const query = loaderUtils.getOptions(this) || {};
  const id = query.scopeID;

  const options = {
    from: this.resourcePath,
    to: this.resourcePath,
    map: false
  }

  postcss([scopeId({ id })])
    .process(css, options)
    .then(res=>{
      cb(null, res.css);
    })
}