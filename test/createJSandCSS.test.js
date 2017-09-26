import fsx from 'fs-extra';
import path from 'path';
import klawSync from 'klaw-sync';

import createJSandCSS from '../lib/createJSandCSS';
import buildOption from './util/buildOption.normal';


describe('createJSandCSS', function(){

  it('should pass with normal parameters', function(){

    const buffers = {
      jsBuffer: 'var a = 1',
      cssBuffer: '.comA { font-size: 12}',
    }

    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
    createJSandCSS(buffers, buildOption);
    const builtCSS = klawSync(path.join(__dirname, './assetsCoreTest/css'), {nodir: true});
    const builtJS = klawSync(path.join(__dirname, './assetsCoreTest/js'), {nodir: true});
    expect(builtJS).toHaveLength(1);
    expect(builtCSS).toHaveLength(1);
    fsx.removeSync(path.join(__dirname, './assetsCoreTest'));
  });

  it('should throw error when buffers is broken', function(){
    expect(()=>{
      createJSandCSS({adf: 333, bbb:313}, buildOption);
    }).toThrowError('[webpack-component-loader]: there is no css or js in buffers');
  })

})