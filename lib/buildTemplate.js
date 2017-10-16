const reportError = require('./utils/reportError');

const rewriteTemplate = require('./rewriteTemplate');

module.exports = function buildTemplate(components, buildOption) {
  if (!Array.isArray(components)) {
    reportError('something wrong with building Template: components is not an array');
  }
  components.forEach(rewriteTemplate, buildOption);
};
