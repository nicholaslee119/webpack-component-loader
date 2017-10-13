import setScope from "../lib/setScope";
// import normalComponent from "./fixture/scopeCompo/scopeCompo.tpl";

describe('test setScope', function(){

  it('should pass with normal', function(){
    expect.assertions(1);
    const normalTemplate =
    `<div>`+
    `    <p class="scopedClass">I am scopeCompo</p>`+
    `    <p class="scopedClassS">I am scopeCompo</p>`+
    `    <p>without className</p>`+
    `    <p class="withoutScoped">element with global namespace</p>`+
    `    <p>without className</p>`+
    `</div>`;

    const component = {
      scopeNames: ['scopedClass', 'scopedClassS'],
      scopeID: 'dr2343d'
    };

    return setScope(normalTemplate, component).then((res) => {
      expect(res).toMatch(
        `<div>`+
        `    <p class="scopedClass" data-s-${component.scopeID}="">I am scopeCompo</p>`+
        `    <p class="scopedClassS" data-s-${component.scopeID}="">I am scopeCompo</p>`+
        `    <p>without className</p>`+
        `    <p class="withoutScoped">element with global namespace</p>`+
        `    <p>without className</p>`+
        `</div>`);
    });

  })
})