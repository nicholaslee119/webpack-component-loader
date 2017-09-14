const path = require('path');
let srcPath;
let builtJSPath;
let builtCSSPath;
let builtTemplatePath;
let includeReg;

function main (source, regex) {
  includeReg = regex;
  const components = parsePage(source);
  buildComponents(components, pageFile.path);
}

function parsePage (source) {
  const includes = source.match(includeReg);
  if (!includes) return;
  let res = [];
  const recursiveIncludes = includes.map(componentPath => {
    const parsed = path.parse(componentPath);
    const recursiveRes = parsePage(path.join(srcPath, parsed.dir, parsed.name, parsed.base));
    if (recursiveRes) res.push(recursiveRes);
    return path.parse(includedComponent);
  });
  return [...new Set(res.concat(recursiveIncludes))];
}

function buildComponents (components, pageFilePath) {
  let jsBuffer = '';
  let cssBuffer = '';
  // TODO: add pattern of separately insertion of js/css
  components.forEach(component => {
    let componentPath = path.join(srcPath,
      component.dir,
      component.name, component.name);
  if (fs.existsSync(componentPath + '.css')) {
    cssBuffer += fs.readFileSync(componentPath + '.css', 'utf8');
  }
  if (fs.existsSync(componentPath + '.js')) {
    jsBuffer += fs.readFileSync(componentPath + '.js', 'utf8');
  }
});
  buildJSandCSS(jsBuffer, cssBuffer, pageFilePath);
  buildTemplate(components);
}

function buildJSandCSS (jsBuffer, cssBuffer, pageFilePath) {
  const pageName = path.parse(pageFilePath).name.replace('.page', '');
  let jsBufferIsEmpty = true;
  let cssBufferIsEmpty = true;
  if (jsBuffer) {
    // TODO: intro babel
    fs.writeFile(path.join(builtJSPath, pageName + '.entry.js'), jsBuffer, function (err) {
      if (err) throw err;
      console.log(pageName + '.entry.js was built successfully!');
    });
    jsBufferIsEmpty = false;
  }
  if (cssBuffer) {
    // TODO: intro sass/less
    fs.writeFile(path.join(builtCSSPath, pageName + '.entry.css'), cssBuffer, function (err) {
      if (err) throw err;
      console.log(pageName + '.entry.css was built successfully!');
    });
    cssBufferIsEmpty = false;
  }
  insertJSandCSS(pageFilePath, jsBufferIsEmpty, cssBufferIsEmpty);
}

function buildTemplate (components) {
  components.forEach(component => {
    if (component.name.includes('page') ) return;
  const templatePath = path.join(srcPath,
    component.dir,
    component.name, component.name + '.tpl');
  const template = fs.readFileSync(templatePath, 'utf8');
  fs.writeFile(path.join(builtTemplatePath, component.dir, component.name + '.tpl'), template, function (err) {
    if (err) throw err;
    console.log(component.base + ' was built successfully!');
  });
});
}

function insertJSandCSS (pagePath, jsBufferIsEmpty, cssBufferIsEmpty) {
  const pageDir = path.parse(pagePath);
  const dir = pageDir.dir.slice(pageDir.dir.indexOf(srcPath) + srcPath.length).replace(`/${pageDir.name}`, '');
  let pageTpl = fs.readFileSync(pagePath, 'utf8');
  pageDir.name = pageDir.name.replace('.page', '');
  pageDir.base = pageDir.base.replace('.page', '');
  pageTpl = pageTpl
  .replace('{* javaScript insertion *}',
    !jsBufferIsEmpty ? `<script src="${builtCSSPath}/${pageDir.name}.entry.js?id=CACHE_REVISION"/>` : '')
  .replace('{* css insertion *}',
    !cssBufferIsEmpty ? `<link rel="stylesheet" href="${builtJSPath}/${pageDir.name}.entry.css?id=CACHE_REVISION" type="text/css">` : '');
  fs.writeFile(path.join(builtTemplatePath, dir, pageDir.base), pageTpl, function (err) {
    if (err) throw err;
    console.log(pageDir.base + ' file was built successfully!');
  });
}

module.exports = main;
