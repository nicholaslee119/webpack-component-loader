[![NPM][npm]][npm-url]
[![Tests][build]][build-url]
[![Deps][deps]][deps-url]
[![Coverage][cover]][cover-url]

# webpack-component-loader
A webpack loader to componentify CSS/JS/HTML without framework

## install
```javascript

$npm install webpack-component-loader

```
## test
```
$npm test
```

## usage

### webpack

```js

function templateExtractor (source) {
  // extract the including component path from the plain text of template
}

module.exports = {
 module: {
    rules: [
      {
        test   : /\.tpl?$/,
        loader : 'webpack-component-loader',
        query  : {
          extractor : templateExtractor,
          srcPath : path.join(__dirname, '.'),
          builtJSPath : path.join(__dirname, '../assets/js'),
          builtCSSPath : path.join(__dirname, '../assets/css'),
          builtTemplatePath : path.join(__dirname, '../assets//templates'),
        },
      },
    ],
  },
}
```

### example

#### template

```html
<html>
  <head>
    {* css insertion *}
  </head>
  
  <script>
    {* JavaScript insertion *}
  </script>

</html>

```
you can see more detail under examples/

## License

[MIT](http://opensource.org/licenses/MIT)



[npm]: https://img.shields.io/npm/v/webpack-component-loader.svg
[npm-url]: https://www.npmjs.com/package/webpack-component-loader

[deps]: https://david-dm.org/nicholaslee119/webpack-component-loader.svg
[deps-url]: https://david-dm.org/nicholaslee119/webpack-component-loader

[cover]: https://coveralls.io/repos/github/nicholaslee119/webpack-component-loader/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/nicholaslee119/webpack-component-loader?branch=master


[build]: https://travis-ci.org/nicholaslee119/webpack-component-loader.svg?branch=master
[build-url]: https://travis-ci.org/nicholaslee119/webpack-component-loader.svg?branch=master
