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

function main(source, extractor, injector, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) {
  if(!checkPath(srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath))
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
  buildComponents(components, injector, buildOption);
}

module.exports = main;
