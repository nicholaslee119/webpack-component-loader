const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');

module.exports = postcss.plugin('add-id', ({ id }) => (cssNodes) => {

  const isScoped = cssNodes.some(node => node.type === 'comment' && node.text === 'scoped');

  if (isScoped) {
    cssNodes.some((node) => {
      if (!node.selector) {
        return false;
      }
      node.selector = selectorParser((selectors) => {
        selectors.each((selector) => {
          let insertNode = null;
          selector.each((n) => {
            insertNode = n;
          })
          selector.insertAfter(insertNode, selectorParser.attribute({
            attribute: `data-s-${id}`,
          }));
        });
      }).process(node.selector).result;
      return false;
    });
  }
});
