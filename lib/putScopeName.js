import path from 'path';
import fsx from 'fs-extra';

// TODO: should improve
function findScopeName (component, buildOption) {
  const cssFilePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.name}.css`);

  const css = fsx.readFileSync(cssFilePath, 'utf8');
  const selectorNameReg = new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)", 'g');
  const res = css.match(selectorNameReg);
  return res.map((item)=>{
    return item.slice(1, item.length-1).trim();
  });
}

module.exports = function(components, buildOption) {
  components = components.map(component=>{
    component.scopeNames = findScopeName(component, buildOption);
    return component;
  })
}