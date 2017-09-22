import path from 'path';

export default {
  ext: '.tpl',
  srcPath: path.join(__dirname, '../testSource'),
  builtJSPath: path.join(__dirname, '../assetsCoreTest/js'),
  builtCSSPath: path.join(__dirname, '../assetsCoreTest/css'),
  builtTemplatePath: path.join(__dirname, '../assetsCoreTest/templates'),
  currentPagePath:  path.join(__dirname, '../testSource/pageC/pageC.tpl'),
};