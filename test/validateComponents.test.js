import validate from '../lib/validateComponent';
import normalCompos from './util/components.normal';
import normalOption from './util/buildOption.normal';

describe('test validateComponent', function(){
  it('should pass with normal component', function(){
    var components = Array.from(normalCompos);
    validate(components, normalOption);
    expect(components).toHaveLength(normalCompos.length);
  })

  it('should remove nonexistence', function(){

    var componentsWithNonexistence =
      [
        {
          "root": "",
          "dir": "include",
          "base": "componentA.tpl",
          "ext": ".tpl",
          "name": "componentA"
        },
        {
          "root": "",
          "dir": "include",
          "base": "componentD.tpl",
          "ext": ".tpl",
          "name": "componentD"
        },
        {
          "root": "",
          "dir": "",
          "base": "nonExistence.tpl",
          "ext": ".tpl",
          "name": "nonExistence"
        },
        {
          "root": "/",
          "dir": "",
          "base": "pageC.tpl",
          "ext": ".tpl",
          "name": "pageC"
        }
      ];
    const res = validate(componentsWithNonexistence, normalOption);
    expect(res).toHaveLength(3);
  })
})