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
  if (!component.scopedSelectors) return template;
  const attrsTree = {};
  component.scopedSelectors.forEach((scopedSelector) => {
    attrsTree[`.${scopedSelector}`] = {};
    attrsTree[`.${scopedSelector}`][`data-s-${component.scopeID}`] = '';
  });
  return rewrite(template, attrsTree);
};
