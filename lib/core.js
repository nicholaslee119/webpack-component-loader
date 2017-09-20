import parsePage from './parsePage';
import buildComponents from './buildComponents';

function main(source, extractor, ext, srcPath, builtJSPath, builtCSSPath, builtTemplatePath, currentPagePath) {
  const buildOption = {
    ext,
    srcPath,
    builtJSPath,
    builtCSSPath,
    builtTemplatePath,
    currentPagePath,
  };
  const components = parsePage(source, extractor, buildOption);
  buildComponents(components, buildOption);
}

module.exports = main;
