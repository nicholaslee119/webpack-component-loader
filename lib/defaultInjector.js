
function createAssetTags(assetsURL) {
  const tags = {};
  if (assetsURL.js) tags.js = `<script src="${assetsURL.js}"></script>`;
  if (assetsURL.css) tags.css = `<link rel="stylesheet" href="${assetsURL.css}" type="text/css">`;
  return tags;
}

export default function (template, assetsURL) {
  const htmlRegExp = /(<html[^>]*>)/i;
  const headRegExp = /(<\/head>)/i;
  const bodyRegExp = /(<\/body>)/i;
  const assetTags = createAssetTags(assetsURL);
  let injected = template;

  if (assetTags.js) {
    if (bodyRegExp.test(injected)) {
      // Append assets to body element
      injected = injected.replace(bodyRegExp, match => assetTags.js + match);
    } else {
      // Append scripts to the end of the file if no <body> element exists:
      injected += assetTags.css;
    }
  }

  if (assetTags.css) {
    if (!headRegExp.test(injected)) {
      if (htmlRegExp(injected)) {
        injected = injected.replace(htmlRegExp, match => match + '<head></head>');
      } else {
        injected = '<head></head>' + injected;
      }
    }
    injected = injected.replace(headRegExp, match => assetTags.css + match);
  }
  return injected;
}
