import loaderUtils from 'loader-utils';
import core from './lib/core';

module.exports = function (source) {
  const regex = loaderUtils.getOpitons(this).regex;
  return core(source, regex);
}