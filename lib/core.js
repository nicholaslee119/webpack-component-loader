import path from 'path';

import parsePage from './parsePage';
import buildComponents from './buildComponents';

function main(source, extractor, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, selfPath) {
  const buildOption = {
    ext,
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    selfPath
  };
  let components = [];
  parsePage(source, extractor, srcPath, components, new Map());
  const pageSelf = path.parse(selfPath);
  pageSelf.dir = '';
  components.push(pageSelf);
  buildComponents(components, buildOption);
}

module.exports = main;
