import fs from 'fs';
import path from 'path';
import fsx from 'fs-extra';

let srcPath;
let builtJSPath;
let builtCSSPath;
let builtTemplatePath;
let currentPagePath;

function readJSandCSS(components) {
  const buffers = {};
  buffers.jsBuffer = '';
  buffers.cssBuffer = '';
  // TODO: add pattern of separately insertion of js/css
  components.forEach((component) => {
    const componentPath = path.join(srcPath, component.dir, component.name, component.name);
    if (fs.existsSync(`${componentPath}.css`)) {
      buffers.cssBuffer += fs.readFileSync(`${componentPath}.css`, 'utf8');
    }
    if (fs.existsSync(`${componentPath}.js`)) {
      buffers.jsBuffer += fs.readFileSync(`${componentPath}.js`, 'utf8');
    }
  });
  return buffers;
}

function insertJSandCSS(buffers) {
  const pageDir = path.parse(currentPagePath);
  const dir = pageDir.dir.slice(pageDir.dir.indexOf(srcPath) + srcPath.length).replace(`/${pageDir.name}`, '');
  let pageTpl = fs.readFileSync(currentPagePath, 'utf8');
  pageTpl = pageTpl
    .replace('{* javaScript insertion *}', buffers.jsBuffer ? `<script src="${builtCSSPath}/${pageDir.name}.entry.js?id=CACHE_REVISION"/>` : '')
    .replace('{* css insertion *}', buffers.jsBuffer ? `<link rel="stylesheet" href="${builtJSPath}/${pageDir.name}.entry.css?id=CACHE_REVISION" type="text/css">` : '');
  fs.writeFileSync(path.join(builtTemplatePath, dir, pageDir.base), pageTpl);
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

export default function buildJSandCSS(components, buildOption) {
  ({
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    currentPagePath,
  } = buildOption);
  const buffers = readJSandCSS(components);
  createJSandCSS(buffers);
  insertJSandCSS(buffers);
}
