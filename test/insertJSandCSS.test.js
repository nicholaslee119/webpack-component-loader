import insertJSandCSS from '../lib/insertJSandCSS';
import buildOption from './util/buildOption.normal';
import injector from './util/injector.normal';


describe('test insertJSandCSS', function(){

  it('should pass when everything is right', function(){
    const buffers = {
      jsBuffer: 'var a = 1',
      cssBuffer: '.comA { font-size: 12}',
    }
    const injected = insertJSandCSS(buffers, injector, buildOption);
    expect(injected).toMatch('.entry.')
  });

  it('should throw error when something wrong with injector', function(){
    const buffers = {
      jsBuffer: 'var a = 1',
      cssBuffer: '.comA { font-size: 12}',
    }
    expect(()=>{
      insertJSandCSS(buffers, function(){throw 'bad injector'}, buildOption);
    }).toThrowError('[webpack-component-loader]: something wrong with injector: bad injector');

  })

  it('should un inject when pass empty buffers', function(){
    const buffers = {};
    expect(insertJSandCSS(buffers, injector, buildOption)).not.toMatch(/\<script.*\>/);
  })

})