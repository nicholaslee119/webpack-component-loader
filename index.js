const loaderUtils = require('loader-utils');
const core = require('./lib/core');

module.exports = function (source) {
  this.cacheable();
  const options = loaderUtils.getOptions(this);
  const extractor = options.extractor;
  const ext = options.ext;
  const srcPath = options.srcPath;
  const builtTemplatePath = options.builtTemplatePath;
  const selfPath = this.resourcePath;
  const out = core(source, extractor, ext, srcPath, builtTemplatePath, selfPath);
  return out;
}
