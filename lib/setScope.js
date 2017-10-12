module.exports = function setScope(template, classNames, scopeID) {
  if (!classNames) return template;
  let classNameReg = classNames.join('|');
  classNameReg = `<p.*['"](${classNameReg})['"]`;
  classNameReg = new RegExp(classNameReg, 'g');
  return template.replace(classNameReg, item => item.replace('<p ', `<p data-s-${scopeID} `));
};
