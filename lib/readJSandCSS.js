const fs = require('fs');
const path = require('path');

module.exports = function readJSandCSS(components, buildOption) {
  // TODO: add pattern of separately insertion of js/css
  return components.reduce((buffers, component) => {
    const componentPath = path.join(buildOption.srcPath, component.dir, component.name, component.name);
    if (fs.existsSync(`${componentPath}.css`)) {
      buffers.cssBuffer = buffers.cssBuffer + fs.readFileSync(`${componentPath}.css`, 'utf8');
    }
    if (fs.existsSync(`${componentPath}.js`)) {
      buffers.jsBuffer = buffers.jsBuffer + fs.readFileSync(`${componentPath}.js`, 'utf8');
    }
    return buffers;
  }, { cssBuffer: '', jsBuffer: '' });
}