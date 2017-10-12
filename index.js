const loaderUtils = require('loader-utils');
const core = require('./lib/core');

module.exports = function loaderEntry(source) {
  this.cacheable();
  const options = loaderUtils.getOptions(this);
  const isCodeSplit = options.isCodeSplit || false;
  const {
    extractor, ext, srcPath, builtTemplatePath,
  } = options;
  const selfPath = this.resourcePath;
  return core(source, isCodeSplit, extractor, ext, srcPath, builtTemplatePath, selfPath);
};
