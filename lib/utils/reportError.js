
module.exports = function reportError(message) {
  throw new Error(`[webpack-component-loader]: ${message}\n`);
}
