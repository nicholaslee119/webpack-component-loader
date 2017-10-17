const path = require('path');
const fsx = require('fs-extra');
const reportError = require('./utils/reportError');

module.exports = async function rewriteTemplate(component) {
  const buildOption = this;
  const templatePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.base}`);
  if (fsx.existsSync(templatePath)) {
    try {
      const template = fsx.readFileSync(templatePath, 'utf8');
      let res = await buildOption.addScopeAttr(template, component);
      if (component.pageFlag) res = buildOption.injector(res, component, buildOption);
      fsx.ensureDirSync(path.resolve(buildOption.builtTemplatePath, component.dir));
      fsx.writeFileSync(path.resolve(buildOption.builtTemplatePath, component.dir, `${component.base}`), res);
    } catch (e) {
      reportError(e);
    }
  } else {
    reportError(`something wrong with building Template: ${templatePath} is non existence`);
  }
}
