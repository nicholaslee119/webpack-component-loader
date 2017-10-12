const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');

module.exports = postcss.plugin('add-id', (opts) => {
  return function (root) {
    root.each((node) => {
      const transform = (selectors) => {
        selectors.each((selector) => {
          let node = null;
          selector.each((n) => {
            node = n;
          });
          selector.insertAfter(node, selectorParser.attribute({
            attribute: `data-s-${opts.id}`,
          }));
        });
      };
      node.selector = selectorParser(transform).process(node.selector).result;
    });
  };
});
