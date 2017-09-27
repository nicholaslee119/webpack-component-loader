import fs from 'fs';
import path from 'path';
import core from '../lib/core';
import fsx from 'fs-extra';

import {injector, extractor} from 'webpack-component-loader-smarty-parser';

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
    expect(() => {
      core(pageTpl, extractor, injector, '.tpl',
        path.join(__dirname, './!!!!'),
        path.join(__dirname, '..../assetsCoreTest/js'),
        [1,24,22],
        path.join(__dirname, './assetsCoreTest/templates'),
        '')
    }).toThrowError(
      `[webpack-component-loader]: ${path.join(__dirname, './!!!!')} is not validate path`
    );
  });

  it('unvalidate source should not be passed', function(){
    clearBuild();
    expect(()=>{
      core('', extractor, injector, '.tpl',
        path.join(__dirname, './fixture'),
        path.join(__dirname, './assetsCoreTest/js'),
        path.join(__dirname, './assetsCoreTest/css'),
        path.join(__dirname, './assetsCoreTest/templates'),
        path.join(__dirname, './fixture/pageC/pageC.tpl')
      );
    }).toThrowError(
      '[webpack-component-loader]: something wrong with the source'
    );
  });

  it('unvalidate extractor should not be passed', function(){
    clearBuild();
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    expect(()=>{
      core(pageTpl, {}, injector, '.tpl',
        path.join(__dirname, './fixture'),
        path.join(__dirname, './assetsCoreTest/js'),
        path.join(__dirname, './assetsCoreTest/css'),
        path.join(__dirname, './assetsCoreTest/templates'),
        path.join(__dirname, './fixture/pageC/pageC.tpl')
      )
    }).toThrowError(
      '[webpack-component-loader]: something wrong with the extractor or injector'
    );
  });

  it('unvalidate injector should not be passed', function(){
    clearBuild();
    const pageTpl = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    expect(()=>{
      core(pageTpl, extractor, {}, '.tpl',
        path.join(__dirname, './fixture'),
        path.join(__dirname, './assetsCoreTest/js'),
        path.join(__dirname, './assetsCoreTest/css'),
        path.join(__dirname, './assetsCoreTest/templates'),
        path.join(__dirname, './fixture/pageC/pageC.tpl')
      )
    }).toThrowError(
      '[webpack-component-loader]: something wrong with the extractor or injector'
    );
  });

})

