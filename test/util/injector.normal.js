export default function injectAssets(template, assetsURL) {
  const assetTags = {};
  if(assetsURL.js) assetTags.js = `<script src="${assetsURL.js}"/>`;
  if(assetsURL.css) assetTags.css = `<link rel="stylesheet" href="${assetsURL.css}" type="text/css">`;
  const inserted = template
  .replace('{* javaScript insertion *}', assetTags.js ? assetTags.js : '')
  .replace('{* css insertion *}', assetTags.css ? assetTags.css : '');
  return inserted;
}