import parsePage from '../lib/parsePage';
import path from 'path';
import fs from 'fs';

import buildOptionNormal from './util/buildOption.normal';
import extractor from './util/extractor.normal';

describe('test parsePage', function() {
  it('normal', function() {
    const source = fs.readFileSync(path.join(__dirname, './testSource/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, extractor, buildOptionNormal);
    expect(components).toHaveLength(4);
  })
})


