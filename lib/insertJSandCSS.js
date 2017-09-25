const fs = require('fs');
const path = require('path');

module.exports = function insertJSandCSS(buffers, injector, buildOption) {
  const pageDir = path.parse(buildOption.currentPagePath);
  const pageTpl = fs.readFileSync(buildOption.currentPagePath, 'utf8');
  const assetsURL = {};
  if (buffers.jsBuffer) {
    assetsURL.js = `${buildOption.builtCSSPath}/${pageDir.name}.entry.js?id=CACHE_REVISION`;
  }
  if (buffers.css) {
    assetsURL.css = `${buildOption.builtJSPath}/${pageDir.name}.entry.css?id=CACHE_REVISION`;
  }
  const injected = injector(pageTpl, assetsURL);
  return injected;
}