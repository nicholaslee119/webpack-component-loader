const fs = require('fs') ;
const path = require('path');
const fsx = require('fs-extra');

function reportError(message) {
  throw `[webpack-component-loader]: something wrong with building Template: ${message}`;
}

module.exports = function buildTemplate(components, buildOption) {
  if (!Array.isArray(components))
    reportError('components is not an array');
  components.forEach((component) => {
    let templatePath;
    if (component.pageFlag) {
      // TODO: implement css namespace here shodow DOM
      templatePath = path.resolve(buildOption.srcPath, component.dir, `${component.name}${buildOption.ext}`);
    } else {
      templatePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.name}${buildOption.ext}`);
    }
    if (fs.existsSync(templatePath)) {
      try {
        const template = fs.readFileSync(templatePath, 'utf8');
        fsx.ensureDirSync(path.resolve(buildOption.builtTemplatePath, component.dir));
        fs.writeFileSync(path.resolve(buildOption.builtTemplatePath, component.dir, `${component.name}${buildOption.ext}`), template);
      } catch (e) {
        reportError(e);
      }
    } else {
      reportError(`${templatePath} is non existence`);
    }
  });
};

