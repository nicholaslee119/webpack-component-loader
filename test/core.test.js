import fs from 'fs';
import path from 'path';
import core from '../lib/core';

function templateExtractor (source) {
  var included = source.match(/\'.*\'/g);
  if(!included) return null;
  var res = [];
  included.forEach(function (element) {
    res.push(element.slice(1,element.length-1));
  })
  return res;
}

describe('core test', function() {
  it('smarty template test', function(){
    const pageTpl = fs.readFileSync(path.join(__dirname, './testSource/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, templateExtractor, '.tpl',
      path.join(__dirname, './testSource'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './testSource/pageC/pageC.tpl')
    )
  })
})

