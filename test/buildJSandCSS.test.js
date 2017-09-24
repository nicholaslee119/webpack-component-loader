import klawSync from 'klaw-sync';
import path from 'path';
import fsx from 'fs-extra';

import buildJSandCSS from '../lib/buildJSandCSS';
import buildOptionNormal from '../test/util/buildOption.normal';
import injector from './util/injector.normal';

function clearifyBuiltAssets () {
  fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
}

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
    clearifyBuiltAssets();
    buildJSandCSS(normalComponents, injector, buildOptionNormal);
    const builtCSS = klawSync(path.join(__dirname, './assetsCoreTest/css'), {nodir: true});
    const builtJS = klawSync(path.join(__dirname, './assetsCoreTest/js'), {nodir: true});
    expect(builtJS).toHaveLength(1);
    expect(builtCSS).toHaveLength(1);
    clearifyBuiltAssets();
  })

  it('inexistent component', function() {
    const inexistentComponents =
      [
        {
          "root": "",
          "dir": "include",
          "base": "noA.tpl",
          "ext": ".tpl",
          "name": "noA"
        },
        {
          "root": "/",
          "dir": "",
          "base": "noB.tpl",
          "ext": ".tpl",
          "name": "noB"
        }
      ];
    clearifyBuiltAssets();
    buildJSandCSS(inexistentComponents, injector, buildOptionNormal);
    const builtCSS = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest/css'));
    const builtJS = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest/js'));
    expect(builtJS).toBeFalsy();
    expect(builtCSS).toBeFalsy();
    clearifyBuiltAssets();
  })

})