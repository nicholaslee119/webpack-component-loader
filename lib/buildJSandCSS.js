const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');

let srcPath;
let builtJSPath;
let builtCSSPath;
let builtTemplatePath;
let currentPagePath;

function readJSandCSS(components) {
  // TODO: add pattern of separately insertion of js/css
  return components.reduce((buffers, component) => {
    const curBuffer = {};
    const componentPath = path.join(srcPath, component.dir, component.name, component.name);
    if (fs.existsSync(`${componentPath}.css`)) {
      curBuffer.cssBuffer = buffers.cssBuffer + fs.readFileSync(`${componentPath}.css`, 'utf8');
    }
    if (fs.existsSync(`${componentPath}.js`)) {
      curBuffer.jsBuffer = buffers.jsBuffer + fs.readFileSync(`${componentPath}.js`, 'utf8');
    }
    return curBuffer;
  }, { cssBuffer: '', jsBuffer: '' });
}

function buildPageTemplate(injected) {
  const pageDir = path.parse(currentPagePath);
  const dir = pageDir.dir.slice(pageDir.dir.indexOf(srcPath) + srcPath.length).replace(`/${pageDir.name}`, '');
  fsx.ensureDirSync(path.join(builtTemplatePath, dir));
  fs.writeFileSync(path.join(builtTemplatePath, dir, pageDir.base), injected);
}

function insertJSandCSS(buffers, injector) {
  const pageDir = path.parse(currentPagePath);
  const pageTpl = fs.readFileSync(currentPagePath, 'utf8');
  const assetsURL = {};
  if (buffers.jsBuffer) {
    assetsURL.js = `${builtCSSPath}/${pageDir.name}.entry.js?id=CACHE_REVISION`;
  }
  if (buffers.css) {
    assetsURL.css = `${builtJSPath}/${pageDir.name}.entry.css?id=CACHE_REVISION`;
  }
  const injected = injector(pageTpl, assetsURL);
  buildPageTemplate(injected);
}

function createJSandCSS(buffers) {
  const pageName = path.parse(currentPagePath).name;
  if (buffers.jsBuffer) {
    // TODO: intro babel
    fsx.ensureDirSync(builtJSPath);
    fs.writeFileSync(path.join(builtJSPath, `${pageName}.entry.js`), buffers.jsBuffer);
  }
  if (buffers.cssBuffer) {
    // TODO: intro sass/less
    fsx.ensureDirSync(builtCSSPath);
    fs.writeFileSync(path.join(builtCSSPath, `${pageName}.entry.css`), buffers.cssBuffer);
  }
}

module.exports = function buildJSandCSS(components, injector, buildOption) {
  ({
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    currentPagePath,
  } = buildOption);
  const buffers = readJSandCSS(components);
  createJSandCSS(buffers);
  insertJSandCSS(buffers, injector);
}
