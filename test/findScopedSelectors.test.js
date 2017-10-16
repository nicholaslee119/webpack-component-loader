import findScopedSelectors from '../lib/findScopedSelectors';
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
    findScopedSelectors(components, buildOption);
    // TODD: should improve
    expect(components.every(component=>{
      return component.hasOwnProperty('scopedSelectors') && component.scopedSelectors !== undefined;
    })).toBeTruthy();
  })
})