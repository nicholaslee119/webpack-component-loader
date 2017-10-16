const path = require('path');
const fsx = require('fs-extra');

// TODO: should improve, maybe deal with postcss
function findScopeName(component, buildOption) {
  const cssFilePath = path.resolve(buildOption.srcPath, component.dir, component.name, `${component.name}.css`);
  const css = fsx.readFileSync(cssFilePath, 'utf8');
  const selectorNameReg = new RegExp("([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)", 'g');
  if (css.indexOf('/* scoped */') === -1) return [];
  const res = css.match(selectorNameReg);
  return res.map(item => item.slice(1, item.length - 1).trim());
}

module.exports = function (components, buildOption) {
  components.forEach((component) => {
    component.scopeNames = findScopeName(component, buildOption);
    return component;
  });
}
