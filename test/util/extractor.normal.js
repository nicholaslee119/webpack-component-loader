export default function templateExtractor (source) {
  var included = source.match(/\'.*\'/g);
  if(!included) return [];
  var res = [];
  included.forEach(function (element) {
    res.push(element.slice(1,element.length-1));
  })
  return res;
}