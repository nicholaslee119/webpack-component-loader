const parsePage = require('./parsePage');
const createOutput = require('./createOutput');
const buildTemplate = require('./buildTemplate');
const genScopeID = require('./genScopeID');
const putScopeName = require('./putScopeName');

module.exports = function core(source, buildOption) {
  const components = parsePage(source, buildOption);
  genScopeID(components);
  putScopeName(components, buildOption);
  buildTemplate(components, buildOption);
  return createOutput(components, buildOption);
}
