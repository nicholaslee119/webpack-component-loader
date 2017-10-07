// TODO: make it more reliable
const hash = require('hash-sum');
const cache = Object.create(null);

function genID (component) {
  const filePath = `${component.dir}/${component.base}`;
  return cache[filePath] || (cache[filePath] = hash(filePath))
}

module.exports = function genScopeID (components) {
  return components.map(component=>{
    component.scopeID = genID (component);
    return component;
  });
};