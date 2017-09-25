const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');

module.exports = function createJSandCSS(buffers, buildOption) {
  const pageName = path.parse(buildOption.currentPagePath).name;
  if (buffers.jsBuffer) {
    // TODO: intro babel
    fsx.ensureDirSync(buildOption.builtJSPath);
    fs.writeFileSync(path.join(buildOption.builtJSPath, `${pageName}.entry.js`), buffers.jsBuffer);
  }
  if (buffers.cssBuffer) {
    // TODO: intro sass/less
    fsx.ensureDirSync(buildOption.builtCSSPath);
    fs.writeFileSync(path.join(buildOption.builtCSSPath, `${pageName}.entry.css`), buffers.cssBuffer);
  }
}