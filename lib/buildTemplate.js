const fs = require('fs') ;
const path = require('path');
const fsx = require('fs-extra');

function reportError(errorHandler, message) {
  console.warn(`[webpack-component-loader]: something wrong with building Template: ${message}`);
  if (errorHandler) errorHandler(message);
}

module.exports = function buildTemplate(components, buildOption, errorHandler) {
  if (!Array.isArray(components)) {
    console.warn('[webpack-component-loader]: something wrong with building Template: \n components is not an array');
    return;
  }
  components.forEach((component) => {
    if (component.pageFlag) return;
    try {
      const templatePath = path.join(buildOption.srcPath, component.dir, component.name, `${component.name}${buildOption.ext}`);
      if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, 'utf8');
        fsx.ensureDirSync(path.join(buildOption.builtTemplatePath, component.dir));
        fs.writeFileSync(path.join(buildOption.builtTemplatePath, component.dir, `${component.name}${buildOption.ext}`), template);
      } else {
        reportError(errorHandler, `${templatePath} is non existence`);
      }
    } catch (e) {
      reportError(errorHandler, e);
    }
  });
};
