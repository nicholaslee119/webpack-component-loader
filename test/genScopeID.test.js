import genScopeID from '../lib/genScopeID';
import components from './util/components.normal';

describe('test genScopeID', function(){
  it('should pass with normal input', function () {
    const newCompos = genScopeID(components);
    expect(newCompos.every(component=>{
      return component.hasOwnProperty('scopeID') && component.scopeID !== undefined;
    })).toBeTruthy();
  })
})