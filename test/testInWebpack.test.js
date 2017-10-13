import webpack from 'webpack';
import fsx from 'fs-extra';
import path from 'path';

import config from './util/webpack.config.normal';

describe('test in webpack', function () {
  it('should be built successfully in webpack', function(done) {
    function cb (err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }
      expect(err).toBeNull();
      const builtTemplates = fsx.pathExistsSync(path.resolve(__dirname, './assets/templates'));
      const builtJS = fsx.pathExistsSync(path.resolve(__dirname, './assets/js'));
      const builtCSS = fsx.pathExistsSync(path.resolve(__dirname, './assets/css'));
      expect(builtTemplates).toBeTruthy();
      expect(builtJS).toBeTruthy();
      expect(builtCSS).toBeTruthy();
      fsx.removeSync(path.resolve(__dirname, './assets'));
      done();
    };
    fsx.removeSync(path.resolve(__dirname, './assets'));
    webpack (config, cb );
  });


  it('unvalidate path should not be passed', function(done){
    function cb (err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }
      const builtTemplates = fsx.pathExistsSync(path.resolve(__dirname, './assets/templates'));
      // const builtJS = fsx.pathExistsSync(path.resolve(__dirname, './assets/js'));
      const builtCSS = fsx.pathExistsSync(path.resolve(__dirname, './assets/css'));
      expect(builtTemplates).toBeFalsy();
      // expect(builtJS).toBeFalsy();
      expect(builtCSS).toBeFalsy();
      fsx.removeSync(path.resolve(__dirname, './assets'));
      done();
    };
    const badConfig = Object.create(config);
    badConfig.module.rules[0].use[0].options.srcPath = '/!!!!';
    fsx.removeSync(path.resolve(__dirname, './assets'));
    webpack(badConfig, cb );
  });


  it('unvalidate extractor should not be passed', function(done){
    function cb (err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }
      const builtTemplates = fsx.pathExistsSync(path.resolve(__dirname, './assets/templates'));
      // const builtJS = fsx.pathExistsSync(path.resolve(__dirname, './assets/js'));
      const builtCSS = fsx.pathExistsSync(path.resolve(__dirname, './assets/css'));
      expect(builtTemplates).toBeFalsy();
      // expect(builtJS).toBeFalsy();
      expect(builtCSS).toBeFalsy();
      fsx.removeSync(path.resolve(__dirname, './assets'));
      done();
    };
    const badConfig = Object.create(config);
    badConfig.module.rules[0].use[0].options.extractor = {};
    fsx.removeSync(path.resolve(__dirname, './assets'));
    webpack(badConfig, cb );
  });
})