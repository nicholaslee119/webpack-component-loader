export default function templateExtractor (source){
  var included = source.match(/\{include .*\}/g);
  var fileREG = /file\s?=\s?["'].*?["']/;
  var quotationREG = /["'].*?["']/;
  if(!included) return [];
  var res = [];
  included.forEach(function (element) {
    let includeFile = fileREG.exec(element)[0];
    let file = quotationREG.exec(includeFile)[0];
    res.push(file.slice(1,file.length-1));
  });
  return res;
}

