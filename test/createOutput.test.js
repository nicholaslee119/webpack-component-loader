import createOutput from '../lib/createOutput';
import normalBuildOption from './util/buildOption.normal';
import normalComponents from './util/components.normal';


describe('test createOutput', function(){
  it('should pass', function(){
    const res = createOutput(normalComponents, normalBuildOption);
    expect(res).toMatch(/require\('.*'\)/);
  });

  it('should throw error when pass in a bad Array', function(){
    expect(()=>createOutput('NOT AN ARRAY', normalBuildOption)).toThrow('[webpack-component-loader]: the component is not an array');
  })
})