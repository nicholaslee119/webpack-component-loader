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

async function rewriteTemplate(template, attrsTree) {
  const res = await rewrite(template, attrsTree);
  return res;
}

module.exports = function setScope(template, classNames, scopeID) {
  if (!classNames) return template;
  const attrsTree = {};
  classNames.forEach((className) => {
    attrsTree[`.${className}`] = {};
    attrsTree[`.${className}`][`data-s-${scopeID}`] = '';
  });

  return rewriteTemplate(template, attrsTree);
};
