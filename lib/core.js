const isValidPath = require('is-valid-path');

const parsePage = require('./parsePage');
const createOutput = require('./createOutput');
const buildTemplate = require('./buildTemplate');
const genScopeID = require('./genScopeID');
const putScopeName = require('./putScopeName');
const validateComponents = require('./validateComponent');
const reportError = require('./utils/reportError');

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

function main(source, isCodeSplit, extractor, ext, srcPath, builtTemplatePath, currentPagePath) {
  checkPath(srcPath, builtTemplatePath, currentPagePath);
  checkSource(source);
  checkFunction(extractor);
  const buildOption = {
    ext,
    srcPath,
    builtTemplatePath,
    currentPagePath,
  };
  let components = parsePage(source, extractor, buildOption);
  components = validateComponents(components, buildOption);
  genScopeID(components);
  putScopeName(components, buildOption);
  buildTemplate(components, buildOption);
  return createOutput(components, buildOption, isCodeSplit);
}

module.exports = main;
