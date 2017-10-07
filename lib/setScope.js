module.exports = function setScope (template, classNames, scopeID) {
  let classNameReg = classNames.join('|');
  classNameReg = `<p.*['"](${classNameReg})['"]`;
  classNameReg = new RegExp(classNameReg, 'g');
  template = template.replace(classNameReg, item=>item.replace('<p ', `<p ${scopeID} `))
  return template;
}