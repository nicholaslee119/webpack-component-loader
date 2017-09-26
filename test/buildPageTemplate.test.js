import fsx from 'fs-extra';
import fs from 'fs';
import path from 'path';

import buildPageTemplate from '../lib/buildPageTemplate';
import buildOption from './util/buildOption.normal';

describe('test buildPageTemplate', function(){

  it('should pass with normal para', function(){
    const injected = '<html>'+
      '<head>'+
      '<link rel="stylesheet" href="/Users/nic/IdeaProjects/webpack-component-loader/test/assetsCoreTest/js/pageC.entry.css" type="text/css">'+
      '</head>'+
      '<body>'+
      '<div>{include file="include/componentA.tpl"}</div>'+
      '<div>{include file="componentB.tpl"}</div>'+
      '</body>'+
      '<script src="/Users/nic/IdeaProjects/webpack-component-loader/test/assetsCoreTest/css/pageC.entry.js"/>'+
      '</html>';
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    buildPageTemplate(injected, buildOption);
    const dirs = fs.existsSync(path.join(__dirname, './assetsCoreTest/templates/pageC.tpl'));
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeTruthy();
  })

  // it('should throw error when injected is not right', function(){
  //
  // })

})