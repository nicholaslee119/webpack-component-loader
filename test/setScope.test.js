import setScope from "../lib/setScopeID";
import normalComponent from "./fixture/scopeCompo/scopeCompo.tpl";

describe('test setScope', function(){

  it('should pass with normal', function(){
    const scopeNames = ['scopedClass', 'scopedClassS'];
    const hashID = 'data-compo-dr2343d';
    const res = setScope(normalComponent, scopeNames, hashID);

    expect(res).toMatch(
      `<div>
          <p ${hashID} class="scopedClass">I am scopeCompo</p>
          <p ${hashID} class="scopedClassS">I am scopeCompo</p>
          <p>without className</p>
          <p class="withoutScoped">element with global namespace</p>
          <p>without className</p>
      </div>`);
  })
})