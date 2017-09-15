import loader from '../index';
import fs from 'fs';
import path from 'path';

describe('the building test', function() {
  it('smarty', function() {
    const pageTpl = fs.readFileSync(path.join(__dirname, './testSource/c.page/c.page.tpl'), 'utf8');
    loader(pageTpl);
  });
})