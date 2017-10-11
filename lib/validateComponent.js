const path = require('path');
const fs = require('fs');

const reportError = require('./utils/reportError');

module.exports = function validate(components, buildOption) {
  if (!Array.isArray(components)) reportError('components is not an array');
  return components.filter((component) => {
    const templatePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.base}`);
    return fs.existsSync(templatePath);
  });
}