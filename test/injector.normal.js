
function createAssetsTags(assetsURL) {
  const tags = {};
  tags.js = `<script src="${assetsURL.js}"/>`;
  tags.css = `<link rel="stylesheet" href="${assetsURL.css}" type="text/css">`;
  return tags;
}

export default function injectAssets(template, assetsURL) {
  const assetTags = createAssetsTags(assetsURL);
  const inserted = template
  .replace('{* javaScript insertion *}', assetTags.js ? assetTags.js : '')
  .replace('{* css insertion *}', assetTags.css ? assetTags.css : '');
  return inserted;
}