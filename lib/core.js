const fs = require('fs');
const isValidPath = require('is-valid-path');

const parsePage = require('./parsePage');
const buildComponents = require('./buildComponents');

function checkPath (...url) {
  return url.every((url)=>{
    const checkRes = typeof url === 'string' && isValidPath(url);
    if (!checkRes) {
      console.error(`[webpack-component-loader]: ${url} is not validate path`)
    }
    return checkRes;
  })
}

function checkSource (source) {
  const res = typeof source === 'string' && source;
  if (!res) console.error(`[webpack-component-loader]: something wrong with the source`);
  return res;
}

function checkFunction (extractor, injector) {
  const res = typeof extractor === 'function' && typeof injector === 'function';
  if (!res) console.error(`[webpack-component-loader]: something wrong with the extractor or injector`);
  return res;
}

function main(source, extractor, injector, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) {
  if(!checkPath(srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) || !checkSource(source) || !checkFunction(extractor, injector))
    return;
  const buildOption = {
    ext,
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    currentPagePath,
  };
  const components = parsePage(source, extractor, buildOption);
  if(components.length === 0) return;
  buildComponents(components, injector, buildOption);
}

module.exports = main;
