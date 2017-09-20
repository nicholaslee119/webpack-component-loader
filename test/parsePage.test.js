import parsePage from '../lib/parsePage';
import path from 'path';
import fs from 'fs';

function templateExtractor (source) {
  var included = source.match(/\'.*\'/g);
  if(!included) return null;
  var res = [];
  included.forEach(function (element) {
    res.push(element.slice(1,element.length-1));
  })
  return res;
}

const buildOption = {
  ext: '.tpl',
  srcPath: path.join(__dirname, './testSource'),
  builtJSPath: path.join(__dirname, './assetsCoreTest/js'),
  builtCSSPath: path.join(__dirname, './assetsCoreTest/css'),
  builtTemplatePath: path.join(__dirname, './assetsCoreTest/templates'),
  currentPagePath:  path.join(__dirname, './testSource/pageC/pageC.tpl'),
};

describe('test parsePage', function() {
  it('normal', function() {
    const source = fs.readFileSync(path.join(__dirname, './testSource/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, templateExtractor, buildOption);
    expect(components).toHaveLength(4);
  })
})


