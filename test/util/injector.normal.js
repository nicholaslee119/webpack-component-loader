export default function injectAssets(template, assetsURL) {
  const assetTags = {};
  assetTags.js = `<script src="${assetsURL.js}"/>`;
  assetTags.css = `<link rel="stylesheet" href="${assetsURL.css}" type="text/css">`;
  const inserted = template
    .replace('{* javaScript insertion *}', assetTags.js ? assetTags.js : '')
    .replace('{* css insertion *}', assetTags.css ? assetTags.css : '');
  return inserted;
}