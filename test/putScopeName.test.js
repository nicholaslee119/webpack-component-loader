import putScopeName from '../lib/putScopeName';
import buildOption from './util/buildOption.normal';

describe('test genScopeID', function(){
  it('should pass with normal input', function () {
    let components = [
      {
        "root": "/",
        "dir": "",
        "base": "scopeCompo.tpl",
        "ext": ".tpl",
        "name": "scopeCompo"
      }
    ];
    putScopeName(components, buildOption);
    // TODD: should improve
    expect(components.every(component=>{
      return component.hasOwnProperty('scopeNames') && component.scopeNames !== undefined;
    })).toBeTruthy();
  })
})