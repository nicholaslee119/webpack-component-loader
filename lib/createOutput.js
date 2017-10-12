const fsx = require('fs-extra');
const path = require('path');

const reportError = require('./utils/reportError');

module.exports = function createOutput(components, buildOption, isCodeSplit) {
  let output = '';
  if (!Array.isArray(components)) {
    reportError('the component is not an array');
  }

  components.forEach((component) => {
    const compoPath = path.resolve(buildOption.srcPath, component.dir, component.name, component.name);
    const addScopeIDToCSSPath = path.resolve(__dirname, './addScopeIDToCSS/index');
    if (fsx.existsSync(`${compoPath}.js`)) {
      if (isCodeSplit) {
        output += `import('babel-loader!${compoPath}.js');\n`;
      } else {
        output += `require('babel-loader!${compoPath}.js');\n`;
      }
    }
    if (fsx.existsSync(`${compoPath}.css`)) {
      output += `require('${addScopeIDToCSSPath}?{"scopeID":"${component.scopeID}"}!${compoPath}.css');\n`;
    }
  });

  return output;
}