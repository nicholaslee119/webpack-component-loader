const fs = require('fs') ;
const path = require('path');
const fsx = require('fs-extra');

module.exports = function buildTemplate(components, buildOption) {
  components.forEach((component) => {
    if (component.pageFlag) return;
    const templatePath = path.join(buildOption.srcPath, component.dir, component.name, `${component.name}${buildOption.ext}`);
    const template = fs.readFileSync(templatePath, 'utf8');
    fsx.ensureDirSync(path.join(buildOption.builtTemplatePath, component.dir));
    fs.writeFileSync(path.join(buildOption.builtTemplatePath, component.dir, `${component.name}${buildOption.ext}`), template);
  });
};
