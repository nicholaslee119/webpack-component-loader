import fs from 'fs';
import path from 'path';
import core from '../lib/core';
import fsx from 'fs-extra';

import extractor from './util/extractor.normal';
import injector from './util/injector.normal';

function clearBuild () {
  fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
}

describe('core test', function() {
  it('build should success', function(){
    clearBuild();
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, extractor, injector, '.tpl',
      path.join(__dirname, './fixture'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './fixture/pageC/pageC.tpl')
    )
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeTruthy();
  });

  it('unvalidate path should not be passed', function(){
    clearBuild();
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, extractor, injector, '.tpl',
      path.join(__dirname, './!!!!'),
      path.join(__dirname, '..../assetsCoreTest/js'),
      [1,24,22],
      path.join(__dirname, './assetsCoreTest/templates'),
      ''
    );
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeFalsy();
  });

  it('unvalidate source should not be passed', function(){
    clearBuild();
    core('', extractor, injector, '.tpl',
      path.join(__dirname, './fixture'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './fixture/pageC/pageC.tpl')
    );
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeFalsy();
  });

  it('unvalidate extractor or injector should not be passed', function(){
    clearBuild();
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    core(pageTpl, {}, [], '.tpl',
      path.join(__dirname, './fixture'),
      path.join(__dirname, './assetsCoreTest/js'),
      path.join(__dirname, './assetsCoreTest/css'),
      path.join(__dirname, './assetsCoreTest/templates'),
      path.join(__dirname, './fixture/pageC/pageC.tpl')
    );
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeFalsy();
  });

})

