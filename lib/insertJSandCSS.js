const fs = require('fs');
const path = require('path');

module.exports = function insertJSandCSS(buffers, injector, buildOption) {
  const pageDir = path.parse(buildOption.currentPagePath);
  let pageTpl = '';
  let injected = '';
  try {
    pageTpl = fs.readFileSync(buildOption.currentPagePath, 'utf8');
  } catch (e) {
    throw `[webpack-component-loader]: ${e}`;
  }
  const assetsURL = {};
  if (buffers.jsBuffer) {
    assetsURL.js = `${buildOption.builtCSSPath}/${pageDir.name}.entry.js`;
  }
  if (buffers.cssBuffer) {
    assetsURL.css = `${buildOption.builtJSPath}/${pageDir.name}.entry.css`;
  }
  try {
    if (assetsURL) injected = injector(pageTpl, assetsURL)
  } catch (e) {
    throw `[webpack-component-loader]: something wrong with injector: ${e}`;
  }
  return injected;
}