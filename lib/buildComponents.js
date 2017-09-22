const buildJSandCSS = require('./buildJSandCSS');
const buildTemplate = require('./buildTemplate');

module.exports = function buildComponents(components, injector, buildOption) {
  buildJSandCSS(components, injector, buildOption);
  buildTemplate(components, buildOption);
};
