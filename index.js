const loaderUtils = require('loader-utils');
const core = require('./lib/core');

module.exports = function (source) {
  this.cacheable();
  const options = loaderUtils.getOptions(this);
  const isCodeSplit = options.isCodeSplit || false;
  const extractor = options.extractor;
  const injector = options.injector;
  const ext = options.ext;
  const srcPath = options.srcPath;
  const builtJSPath = options.builtJSPath;
  const builtCSSPath = options.builtCSSPath;
  const builtTemplatePath = options.builtTemplatePath;
  const selfPath = this.resourcePath;
  const out = core(source, isCodeSplit, extractor, injector, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, selfPath);
  return out;
}
