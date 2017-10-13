const parsePage = require('./parsePage');
const createOutput = require('./createOutput');
const buildTemplate = require('./buildTemplate');
const genScopeID = require('./genScopeID');
const putScopeName = require('./putScopeName');
const validateComponents = require('./validateComponent');

module.exports = function core(source, buildOption) {
  let components = parsePage(source, buildOption);
  components = validateComponents(components, buildOption);
  genScopeID(components);
  putScopeName(components, buildOption);
  buildTemplate(components, buildOption);
  return createOutput(components, buildOption);
}
