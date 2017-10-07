const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser')


module.exports = postcss.plugin('add-id', function(opts){
  return function(root) {
    root.each(function (node) {
      const transform = selectors => {
        selectors.each(selector => {
          var node = null;
          selector.each(function (n) {
            node = n;
          })
          selector.insertAfter(node, selectorParser.attribute({
            attribute: opts.id
          }))
        });
      };
      node.selector = selectorParser(transform).process(node.selector).result;
    })
  }
})