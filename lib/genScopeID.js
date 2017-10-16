// TODO: make it more reliable
const hash = require('hash-sum');

const cache = Object.create(null);

function genID(component) {
  const filePath = `${component.dir}/${component.base}`;
  const res = cache[filePath] || (cache[filePath] = hash(filePath));
  return res;
}

module.exports = function genScopeID(components) {
  components.forEach((component) => {
    component.scopeID = genID(component);
    return component;
  });
};
