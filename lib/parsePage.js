const path = require('path');
const fs = require('fs');

let components;
const pushedComponents = new Map();

function recursiveParse(source, extractor, srcPath) {
  let includes;
  try {
    includes = extractor(source);
  } catch (e) {
    throw `[webpack-component-loader]: something wrong with the extractor: ${e}`;
  }
  if (!Array.isArray(includes))
    throw '[webpack-component-loader]: the result of extractor is not an array';
  includes.forEach((componentPath) => {
    if (pushedComponents.get(componentPath)) return;
    pushedComponents.set(componentPath, true);
    const parsed = path.parse(componentPath);
    components.push(parsed);
    recursiveParse(fs.readFileSync(path.resolve(srcPath, parsed.dir, parsed.name, parsed.base), 'utf8'), extractor, srcPath, components, pushedComponents);
  });
}

module.exports = function parsePage(source, extractor, buildOption) {
  components = [];
  recursiveParse(source, extractor, buildOption.srcPath);
  const pageSelf = path.parse(buildOption.currentPagePath);
  pageSelf.pageFlag = true;
  components.push(pageSelf);
  return components;
};
