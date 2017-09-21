import fs from 'fs';
import path from 'path';
import klawSync from 'klaw-sync';

import buildTemplate from '../lib/buildTemplate';
import buildOptionNormal from './buildOption.normal';

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
    buildTemplate(normalComponents, buildOptionNormal);
    const dirs = klawSync(path.join(__dirname, './assetsCoreTest/templates'), {nodir: true});
    expect(dirs).toHaveLength(normalComponents.length);
  })
})


