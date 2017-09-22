import fs from 'fs';
import path from 'path';
import core from '../lib/core';

import extractor from './util/extractor.normal';
import injector from './util/injector.normal';

describe('core test', function() {
  it('smarty template test', function(){
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, extractor, injector, '.tpl',
      path.join(__dirname, './fixture'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './fixture/pageC/pageC.tpl')
    )
  })
})

