import klawSync from 'klaw-sync';
import path from 'path';

import buildJSandCSS from '../lib/buildJSandCSS';
import buildOptionNormal from '../test/buildOption.normal';
import injector from './injector.normal';

describe('test buildJSandCSS', function(){

  it('normal', function(){
    const normalComponents =
      [
        {
          "root": "",
          "dir": "include",
          "base": "componentA.tpl",
          "ext": ".tpl",
          "name": "componentA"
        },
        {
          "root": "",
          "dir": "include",
          "base": "componentD.tpl",
          "ext": ".tpl",
          "name": "componentD"
        },
        {
          "root": "",
          "dir": "",
          "base": "componentB.tpl",
          "ext": ".tpl",
          "name": "componentB"
        },
        {
          "root": "/",
          "dir": "",
          "base": "pageC.tpl",
          "ext": ".tpl",
          "name": "pageC"
        }
      ];
    buildJSandCSS(normalComponents, injector, buildOptionNormal);
    const builtCSS = klawSync(path.join(__dirname, './assetsCoreTest/css'), {nodir: true});
    const builtJS = klawSync(path.join(__dirname, './assetsCoreTest/js'), {nodir: true});
    expect(builtJS).toHaveLength(1);
    expect(builtCSS).toHaveLength(1);
  })

})