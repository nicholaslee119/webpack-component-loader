import fs from 'fs';
import path from 'path';
import fsx from 'fs-extra';

export default function buildTemplate(components, buildOption) {
  components.forEach((component) => {
    if (component.name.includes('page')) return;
    const templatePath = path.join(buildOption.srcPath, component.dir, component.name, `${component.name}${buildOption.ext}`);
    const template = fs.readFileSync(templatePath, 'utf8');
    fsx.ensureDirSync(path.join(buildOption.builtTemplatePath, component.dir));
    fs.writeFile(path.join(buildOption.builtTemplatePath, component.dir, `${component.name}${buildOption.ext}`), template, (err) => {
      if (err) throw err;
      console.log(`${component.base} was built successfully!`);
    });
  });
}