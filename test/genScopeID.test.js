import genScopeID from '../lib/genScopeID';
import components from './util/components.normal';

describe('test genScopeID', function(){
  it('should pass with normal input', function () {
    genScopeID(components);
    expect(components.every(component=>{
      return component.hasOwnProperty('scopeID') && component.scopeID !== undefined;
    })).toBeTruthy();
  })
})