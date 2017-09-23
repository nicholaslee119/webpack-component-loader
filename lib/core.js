const fs = require('fs');

const parsePage = require('./parsePage');
const buildComponents = require('./buildComponents');

function checkPath (...url) {

  url.forEach((url)=>{
    if (!(fs.existsSync(url))) {
      console.warn(`[webpack-component-loader]: ${url} is not exist`)
    }
  })

}

function main(source, extractor, injector, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) {

  checkPath(srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath);
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
