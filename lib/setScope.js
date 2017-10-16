// TODO: should improve the plugin, and extract the plugin out
const posthtml = require('posthtml');
const attrsPlugin = require('posthtml-extend-attrs');

function rewrite(template, attrsTree) {
  return new Promise((resolve) => {
    posthtml([attrsPlugin({
      attrsTree,
    })])
      .process(template)
      .then((result) => {
        resolve(result.html);
      });
  });
}

module.exports = function setScope(template, component) {
  if (!component.scopeNames) return template;
  const attrsTree = {};
  component.scopeNames.forEach((className) => {
    attrsTree[`.${className}`] = {};
    attrsTree[`.${className}`][`data-s-${component.scopeID}`] = '';
  });
  return rewrite(template, attrsTree);
};
