import fs from 'fs';
import fsx from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';

import buildTemplate from '../lib/buildTemplate';
import buildOptionNormal from './util/buildOption.normal';

describe('test buildTemplate', function() {

  it('normal', function() {
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
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    buildTemplate(normalComponents, buildOptionNormal);
    const dirs = klawSync(path.join(__dirname, './assetsCoreTest'), {nodir: true});
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toHaveLength(normalComponents.length);
  });

  it('inexistent component', function(done) {
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

    function errorHandler (e) {
      expect(e).toBeDefined();
      fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
      done();
    }
    buildTemplate(inexistentComponents, buildOptionNormal, errorHandler);
  })

  it('empty component', function() {
    const emptyComponents = [];
    fsx.removeSync(path.join(__dirname, './assetsCoreTest/templates'));
    buildTemplate(emptyComponents, buildOptionNormal);
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeFalsy();
  });


  it('on-array component', function() {
    const noArray = 'NOT A ARRAY';
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    buildTemplate(noArray, buildOptionNormal);
    const dirs = fsx.pathExistsSync(path.join(__dirname, './assetsCoreTest'));
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    expect(dirs).toBeFalsy();
  })


  it('broken component', function(done) {
    const brokenComponents = [
      {
        "dir": "include",
        "base": "noA.tpl",
        "ext": ".tpl",
        "name": "noA"
      },
      {
        "root": "/",
        "dir": "",
        "base": "noB.tpl",
        "name": "noB"
      },
      {}
    ];
    function errorHandler (e) {
      expect(e).toBeDefined();
      fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
      done();
    }
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    buildTemplate(brokenComponents, buildOptionNormal, errorHandler);
  })

})


