import parsePage from '../lib/parsePage';
import path from 'path';
import fs from 'fs';

import buildOptionNormal from './buildOption.normal';
import extractor from './extractor.normal';

describe('test parsePage', function() {
  it('normal', function() {
    const source = fs.readFileSync(path.join(__dirname, './testSource/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, extractor, buildOptionNormal);
    expect(components).toHaveLength(4);
  })
})


