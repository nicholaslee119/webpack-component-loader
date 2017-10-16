const path = require('path');
const fsx = require('fs-extra');
const setScope = require('./setScope');
const reportError = require('./utils/reportError');

module.exports = async function rewriteTemplate(component) {
  const templatePath = path.resolve(this.srcPath, component.dir, component.name, `${component.base}`);
  if (fsx.existsSync(templatePath)) {
    try {
      const template = fsx.readFileSync(templatePath, 'utf8');
      const res = await setScope(template, component);
      fsx.ensureDirSync(path.resolve(this.builtTemplatePath, component.dir));
      fsx.writeFileSync(path.resolve(this.builtTemplatePath, component.dir, `${component.base}`), res);
    } catch (e) {
      reportError(e);
    }
  } else {
    reportError(`something wrong with building Template: ${templatePath} is non existence`);
  }
}
