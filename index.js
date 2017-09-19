import loaderUtils from 'loader-utils';
import core from './lib/core';

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const extractor = options.extractor;
  const ext = options.ext;
  const srcPath = options.srcPath;
  const builtJSPath = options.builtJSPath;
  const builtCSSPath = options.builtCSSPath;
  const builtTemplatePath = options.builtTemplatePath;
  const selfPath = this.resourcePath;
  core(source, extractor, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, selfPath);
  return '';
}
