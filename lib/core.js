const fs = require('fs');
const isValidPath = require('is-valid-path');

const parsePage = require('./parsePage');
const createOutput = require('./createOutput');
const buildTemplate = require('./buildTemplate');
const genScopeID = require('./genScopeID');
const putScopeName = require('./putScopeName');

function checkPath (...url) {
  return url.every((url)=>{
    const checkRes = typeof url === 'string' && isValidPath(url);
    if (!checkRes) {
      throw `[webpack-component-loader]: ${url} is not validate path`;
    }
    return checkRes;
  })
}

function checkSource (source) {
  const res = typeof source === 'string' && source;
  if (!res) throw `[webpack-component-loader]: something wrong with the source`;
}

function checkFunction (extractor, injector) {
  const res = typeof extractor === 'function' && typeof injector === 'function';
  if (!res) throw `[webpack-component-loader]: something wrong with the extractor or injector`;
}

function main(source, extractor, injector, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) {
  checkPath(srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath);
  checkSource(source);
  checkFunction(extractor, injector);
  const buildOption = {
    ext,
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    currentPagePath,
  };
  let components = parsePage(source, extractor, buildOption);
  genScopeID(components);
  putScopeName(components, buildOption);
  buildTemplate(components, buildOption);
  return createOutput(components, buildOption);
}

module.exports = main;
