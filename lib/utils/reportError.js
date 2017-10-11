
module.exports = function reportError(message) {
  throw `[webpack-component-loader]: something wrong with building Template: ${message}`;
}