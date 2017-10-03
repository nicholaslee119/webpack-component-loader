const fs = require('fs');
const isValidPath = require('is-valid-path');

const parsePage = require('./parsePage');
const createOutput = require('./createOutput');
const buildTemplate = require('./buildTemplate');

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

function checkFunction (extractor) {
  const res = typeof extractor === 'function';
  if (!res) throw `[webpack-component-loader]: something wrong with the extractor`;
}

function main(source, extractor, ext, srcPath, builtTemplatePath, currentPagePath) {
  checkPath(srcPath, builtTemplatePath, currentPagePath);
  checkSource(source);
  checkFunction(extractor);
  const buildOption = {
    ext,
    srcPath,
    builtTemplatePath,
    currentPagePath,
  };
  const components = parsePage(source, extractor, buildOption);
  buildTemplate(components, buildOption);
  return createOutput(components, buildOption);
}

module.exports = main;
