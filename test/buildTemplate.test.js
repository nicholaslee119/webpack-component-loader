import fs from 'fs';
import fsx from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';

import buildTemplate from '../lib/buildTemplate';
import buildOptionNormal from './util/buildOption.normal';

describe('test buildTemplate', function() {

  it('should built successfully', function(cb) {
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

    setTimeout(()=>{
      const dirs = klawSync(path.join(__dirname, './assetsCoreTest'), {nodir: true});
      expect(dirs).toHaveLength(normalComponents.length);
      fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
      cb();
    }, 0)

  });

  it('should throw error when component is not exist', function() {
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

    const errorPath = path.resolve(buildOptionNormal.srcPath, inexistentComponents[0].dir, inexistentComponents[0].name, `${inexistentComponents[0].name}${buildOptionNormal.ext}`);

    expect(()=>{
      buildTemplate(inexistentComponents, buildOptionNormal);
    }).toThrowError(`[webpack-component-loader]: something wrong with building Template: ${errorPath} is non existence`);
  })

  it('should throw error when on-array component was passed in', function() {
    const noArray = 'NOT A ARRAY';
    expect(()=>{
      buildTemplate(noArray, buildOptionNormal);
    }).toThrowError('[webpack-component-loader]: something wrong with building Template: components is not an array')
  })

  it('should throw error when was passed in a broken component', function() {
    const brokenComponents = [
      1,2,
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
    expect(()=>{
      buildTemplate(brokenComponents, buildOptionNormal);
    }).toThrow();
  })

})


