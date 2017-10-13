const path = require('path');
const fsx = require('fs-extra');

const reportError = require('./utils/reportError');

let components;
const pushedComponents = new Map();

function recursiveParse(source, buildOption) {
  let includes;
  try {
    includes = buildOption.extractor(source);
  } catch (e) {
    reportError(`something wrong with the extractor: ${e}`);
  }
  if (!Array.isArray(includes)) {
    reportError('the result of extractor is not an array');
  }
  includes.forEach((componentPath) => {
    if (pushedComponents.get(componentPath)) return;
    pushedComponents.set(componentPath, true);
    const parsed = path.parse(componentPath);
    components.push(parsed);
    const parsedPath = path.resolve(buildOption.srcPath, parsed.dir, parsed.name, parsed.base);
    if (fsx.existsSync(parsedPath)) {
      recursiveParse(fsx.readFileSync(path.resolve(buildOption.srcPath, parsed.dir, parsed.name, parsed.base), 'utf8'), buildOption);
    }
  });
}

module.exports = function parsePage(source, buildOption) {
  components = [];
  recursiveParse(source, buildOption);
  const pageSelf = path.parse(buildOption.currentPagePath);
  pageSelf.dir = pageSelf.dir.replace(pageSelf.name, '').replace(`${buildOption.srcPath}/`, '');
  pageSelf.root = '';
  pageSelf.pageFlag = true;
  components.push(pageSelf);
  return components;
};
