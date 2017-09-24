import parsePage from '../lib/parsePage';
import path from 'path';
import fs from 'fs';

import buildOptionNormal from './util/buildOption.normal';
import extractor from './util/extractor.normal';

describe('test parsePage', function() {
  it('should build successfully', function() {
    const source = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, extractor, buildOptionNormal);
    expect(components).toHaveLength(4);
  });

  it('should stop with something wrong with extractor', function() {
    const source = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, function() { throw 'the extractor is down!'}, buildOptionNormal);
    expect(components).toHaveLength(0);
  });
})


