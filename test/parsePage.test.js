import path from 'path';
import fs from 'fs';

import buildOptionNormal from './util/buildOption.normal';
import parsePage from '../lib/parsePage';

describe('test parsePage', function() {
  it('should build successfully', function() {
    const source = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    const components = parsePage(source, buildOptionNormal);
    expect(components).toHaveLength(4);
  });

  it('should throw error when something wrong with extractor', function() {
    const source = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    const badOptions = Object.create(buildOptionNormal);
    badOptions.extractor = ()=>{ throw 'the extractor is down!'};
    expect(()=>{
      parsePage(source, badOptions);
    }).toThrowError('[webpack-component-loader]: something wrong with the extractor: the extractor is down!');
  });

  it('should throw error when something wrong with extractor', function() {
    const source = fs.readFileSync(path.join(__dirname, './fixture/pageC/pageC.tpl'), 'utf8');
    const badOptions = Object.create(buildOptionNormal);
    badOptions.extractor = ()=>{ return null};
    expect(()=>{
      parsePage(source, badOptions)
    }).toThrowError('[webpack-component-loader]: the result of extractor is not an array');
  });
})
