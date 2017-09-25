
const readJSandCSS = require('./readJSandCSS');
const createJSandCSS = require('./createJSandCSS');
const insertJSandCSS = require('./insertJSandCSS');
const buildPageTemplate = require('./buildPageTemplate');

module.exports = function buildJSandCSS(components, injector, buildOption) {
  if (!Array.isArray(components)) throw '[webpack-component-loader]: the component is not an array'
  const buffers = readJSandCSS(components, buildOption);
  createJSandCSS(buffers, buildOption);
  const inserted = insertJSandCSS(buffers, injector, buildOption);
  buildPageTemplate(inserted, buildOption);
}
