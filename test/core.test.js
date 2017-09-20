import fs from 'fs';
import path from 'path';
import core from '../lib/core';

import extractor from './extractor.normal';

describe('core test', function() {
  it('smarty template test', function(){
    const pageTpl = fs.readFileSync(path.join(__dirname, './testSource/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, extractor, '.tpl',
      path.join(__dirname, './testSource'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './testSource/pageC/pageC.tpl')
    )
  })
})

