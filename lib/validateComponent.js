const path = require('path');
const fsx = require('fs-extra');

const reportError = require('./utils/reportError');

module.exports = function validate(components, buildOption) {
  if (!Array.isArray(components)) reportError('components is not an array');
  return components.filter((component) => {
    const templatePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.base}`);
    // TODO: add report
    return fsx.existsSync(templatePath);
  });
};
