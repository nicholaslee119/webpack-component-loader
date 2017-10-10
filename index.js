const loaderUtils = require('loader-utils');
const core = require('./lib/core');

module.exports = function (source) {
  this.cacheable();
  const options = loaderUtils.getOptions(this);
  const isCodeSplit = options.isCodeSplit || false;
  const extractor = options.extractor;
  const ext = options.ext;
  const srcPath = options.srcPath;
  const builtTemplatePath = options.builtTemplatePath;
  const selfPath = this.resourcePath;
  const out = core(source, isCodeSplit, extractor, ext, srcPath, builtTemplatePath, selfPath);
  return out;
}
