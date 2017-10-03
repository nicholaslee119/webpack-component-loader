import webpack from 'webpack';
import fsx from 'fs-extra';
import path from 'path';

import config from './fixture/webpack.config';

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
      const builtAssets = fsx.pathExistsSync(path.resolve(__dirname, './assets/js'));
      expect(builtTemplates).toBeTruthy();
      expect(builtAssets).toBeTruthy();
      fsx.removeSync(path.resolve(__dirname, './assets'));
      done();
    };

    fsx.removeSync(path.resolve(__dirname, './assets'));
    webpack (config, cb );
  })
})