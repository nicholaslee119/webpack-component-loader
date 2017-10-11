[![NPM][npm]][npm-url]
[![Tests][build]][build-url]
[![Deps][deps]][deps-url]
[![Coverage][cover]][cover-url]

# webpack-component-loader
A webpack loader to componentify CSS/JS/HTML without framework

![illustration](https://github.com/nicholaslee119/webpack-component-loader/blob/improve-document/illustration.png)

## Install
```javascript

$npm install webpack-component-loader

```
## Test
```
$npm test
```

## Usage

### webpack

```js

import {extractor} from 'webpack-component-loader-smarty-parser';
// or create the injector and extractor by yourself
function extractor (source) {
  // extract the including component path from the plain text of template
}

module.exports = {
  entry: './test/fixture/entry.js',
  output: {
    path: path.resolve(__dirname, '..', 'assets', 'js'),
    filename: "bundle.js",
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test   : /\.tpl?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'webpack-component-loader',
            options: {
              isCodeSplit: false,
              extractor : extractor,
              ext: '.tpl',
              srcPath : path.resolve(__dirname, '.'),
              builtJSPath : path.resolve(__dirname, '../assets/js'),
              builtCSSPath : path.resolve(__dirname, '../assets/css'),
              builtTemplatePath : path.resolve(__dirname, '../assets/templates'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        enforce: "post",
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:  "css/[name].css",
      // allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "js/commons.js",
    })
  ]
}
```

## Ecosystem

| Name | Status | Description |
|:----:|:------:|:-----------:|
|[component-smarty-parser][smarty]|[![npm][smarty-badge]][smarty-npm]| Parser to extract and inject smarty template|
|[component-pug-parser][pug]|[![npm][pug-badge]][pug-npm]| Parser to extract and inject pug template |

[smarty]: https://github.com/nicholaslee119/webpack-component-loader-smarty-parser
[smarty-badge]: https://img.shields.io/npm/v/webpack-component-loader-smarty-parser.svg
[smarty-npm]: https://npmjs.com/package/posthtml-parser

[pug]: https://github.com/nicholaslee119/webpack-component-loader-smarty-parser
[pug-badge]: https://img.shields.io/npm/v/webpack-component-loader-smarty-parser.svg
[pug-npm]: https://npmjs.com/package/webpack-component-loader-smarty-parser

## License

[MIT](http://opensource.org/licenses/MIT)



[npm]: https://img.shields.io/npm/v/webpack-component-loader.svg
[npm-url]: https://www.npmjs.com/package/webpack-component-loader

[deps]: https://david-dm.org/nicholaslee119/webpack-component-loader/dev-status.svg
[deps-url]: https://david-dm.org/nicholaslee119/webpack-component-loader?type=dev

[cover]: https://coveralls.io/repos/github/nicholaslee119/webpack-component-loader/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/nicholaslee119/webpack-component-loader?branch=master


[build]: https://travis-ci.org/nicholaslee119/webpack-component-loader.svg?branch=master
[build-url]: https://travis-ci.org/nicholaslee119/webpack-component-loader
