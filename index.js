const isValidPath = require('is-valid-path');

const loaderUtils = require('loader-utils');
const core = require('./lib/core');
const reportError = require('./lib/utils/reportError');

function checkPath(...urls) {
  return urls.every((url) => {
    const checkRes = typeof url === 'string' && isValidPath(url);
    if (!checkRes) {
      reportError(`${url} is not validate path`);
    }
    return checkRes;
  });
}

function checkSource(source) {
  const res = typeof source === 'string' && source;
  if (!res) reportError('something wrong with the source');
}

function checkFunction(extractor) {
  const res = typeof extractor === 'function';
  if (!res) reportError('something wrong with the extractor');
}


module.exports = function loaderEntry(source) {
  this.cacheable();
  const options = loaderUtils.getOptions(this);

  checkPath(options.srcPath, options.builtTemplatePath, this.resourcePath);
  checkFunction(options.extractor);
  checkSource(source);

  const buildOption = {
    ext: options.ext,
    srcPath: options.srcPath,
    builtTemplatePath: options.builtTemplatePath,
    isCodeSplit: options.isCodeSplit,
    extractor: options.extractor,
    currentPagePath: this.resourcePath,
  }

  return core(source, buildOption);
};
