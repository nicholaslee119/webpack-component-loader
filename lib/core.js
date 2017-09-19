const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');

let srcPath;
let builtJSPath;
let builtCSSPath;
let builtTemplatePath;
let selfPath;
let extractor;
let ext;

function parsePage(source) {
  const includes = extractor(source);
  if (!includes) return null;
  const res = [];
  const recursiveIncludes = includes.map((componentPath) => {
    const parsed = path.parse(componentPath);
    const recursiveRes = parsePage(fs.readFileSync(path.join(srcPath, parsed.dir, parsed.name, parsed.base), 'utf8'));
    if (recursiveRes) res.push(recursiveRes);
    return path.parse(componentPath);
  });
  return [...new Set(res.concat(recursiveIncludes))];
}

function insertJSandCSS(pagePath, jsBufferIsEmpty, cssBufferIsEmpty) {
  const pageDir = path.parse(pagePath);
  const dir = pageDir.dir.slice(pageDir.dir.indexOf(srcPath) + srcPath.length).replace(`/${pageDir.name}`, '');
  let pageTpl = fs.readFileSync(pagePath, 'utf8');
  pageTpl = pageTpl
    .replace('{* javaScript insertion *}', !jsBufferIsEmpty ? `<script src="${builtCSSPath}/${pageDir.name}.entry.js?id=CACHE_REVISION"/>` : '')
    .replace('{* css insertion *}', !cssBufferIsEmpty ? `<link rel="stylesheet" href="${builtJSPath}/${pageDir.name}.entry.css?id=CACHE_REVISION" type="text/css">` : '');
  fs.writeFile(path.join(builtTemplatePath, dir, pageDir.base), pageTpl, (err) => {
    if (err) throw err;
    console.log(`${pageDir.base} file was built successfully!`);
  });
}

function buildJSandCSS(jsBuffer, cssBuffer, pageFilePath) {
  const pageName = path.parse(pageFilePath).name;
  let jsBufferIsEmpty = true;
  let cssBufferIsEmpty = true;
  if (jsBuffer) {
    // TODO: intro babel
    fsx.ensureDirSync(builtJSPath);
    fs.writeFile(path.join(builtJSPath, `${pageName}.entry.js`), jsBuffer, (err) => {
      if (err) throw err;
      console.log(`${pageName}.entry.js was built successfully!`);
    });
    jsBufferIsEmpty = false;
  }
  if (cssBuffer) {
    // TODO: intro sass/less
    fsx.ensureDirSync(builtCSSPath);
    fs.writeFile(path.join(builtCSSPath, `${pageName}.entry.css`), cssBuffer, (err) => {
      if (err) throw err;
      console.log(`${pageName}.entry.css was built successfully!`);
    });
    cssBufferIsEmpty = false;
  }
  insertJSandCSS(pageFilePath, jsBufferIsEmpty, cssBufferIsEmpty);
}

function buildTemplate(components) {
  components.forEach((component) => {
    if (component.name.includes('page')) return;
    const templatePath = path.join(srcPath, component.dir, component.name, `${component.name}${ext}`);
    const template = fs.readFileSync(templatePath, 'utf8');
    fs.writeFile(path.join(builtTemplatePath, component.dir, `${component.name}${ext}`), template, (err) => {
      if (err) throw err;
      console.log(`${component.base} was built successfully!`);
    });
  });
}

function buildComponents(components, pageFilePath) {
  let jsBuffer = '';
  let cssBuffer = '';
  // TODO: add pattern of separately insertion of js/css
  components.forEach((component) => {
    const componentPath = path.join(srcPath, component.dir, component.name, component.name);
    if (fs.existsSync(`${componentPath}.css`)) {
      cssBuffer += fs.readFileSync(`${componentPath}.css`, 'utf8');
    }
    if (fs.existsSync(`${componentPath}.js`)) {
      jsBuffer += fs.readFileSync(`${componentPath}.js`, 'utf8');
    }
  });
  buildJSandCSS(jsBuffer, cssBuffer, pageFilePath);
  buildTemplate(components);
}

function main(source, _extractor, _ext, _srcPath, _builtJSPath, _builtCSSPath, _builtTemplatePath, _selfPath) {
  extractor = _extractor;
  srcPath = _srcPath;
  ext = _ext;
  builtJSPath = _builtJSPath;
  builtCSSPath = _builtCSSPath;
  builtTemplatePath = _builtTemplatePath;
  selfPath = _selfPath;
  const components = parsePage(source);
  const pageSelf = path.parse(selfPath);
  pageSelf.dir = '';
  components.push(pageSelf);
  buildComponents(components, selfPath);
}

module.exports = main;
