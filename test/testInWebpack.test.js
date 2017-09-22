import webpack from 'webpack';

import config from './fixture/webpack.config';

describe('test in webpack', function () {
  it('test in webpack', function(done) {
    function cb (err, stats) {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
      }
      done();
    }
    webpack (config, cb );
  })
})