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

module.exports = async function setScope(template, classNames, scopeID) {
  if (!classNames) return template;
  const attrsTree = {};
  classNames.forEach((className) => {
    attrsTree[`.${className}`] = {};
    attrsTree[`.${className}`][`data-s-${scopeID}`] = '';
  });

  const res = await rewrite(template, attrsTree);
  return res;
};
