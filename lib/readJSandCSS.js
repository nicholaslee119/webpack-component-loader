const fs = require('fs');
const path = require('path');

module.exports = function readJSandCSS(components, buildOption) {
  // TODO: add pattern of separately insertion of js/css
  return components.reduce((buffers, component) => {
    if (component.pageFlag) return buffers;
    const componentPath = path.join(buildOption.srcPath, component.dir, component.name, component.name);
    if (!fs.existsSync(`${componentPath}${buildOption.ext}`))
      throw `[webpack-component-loader]: ${component.name} is not exist`;
    try {
      if (fs.existsSync(`${componentPath}.css`)) {
        buffers.cssBuffer = buffers.cssBuffer + fs.readFileSync(`${componentPath}.css`, 'utf8');
      }
      if (fs.existsSync(`${componentPath}.js`)) {
        buffers.jsBuffer = buffers.jsBuffer + fs.readFileSync(`${componentPath}.js`, 'utf8');
      }
    } catch(e) {
      throw `[webpack-component-loader]: something wrong with reading css/js of ${component.name}`;
    }
    return buffers;
  }, { cssBuffer: '', jsBuffer: '' });
}
