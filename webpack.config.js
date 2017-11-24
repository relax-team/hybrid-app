const path = require('path');
const webpack = require('webpack');

//框架Info，让Weex Js引擎识别这个JS bundle需要用Vue框架来解析。
let bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
});

function getBaseConfig () {
  return {
    entry: {
      'sdk': path.resolve('src/views/sdk', 'entry.js'),
      'activity': path.resolve('src/views/activity', 'entry.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
      bannerPlugin
    ]
  }
}

//h5端使用的js
let webConfig = getBaseConfig();
webConfig.output.filename = '[name].web.js';
webConfig.module.rules[1].loader = 'vue-loader';
/**
 * important! should use postTransformNode to add $processStyle for
 * inline style normalization.
 */
webConfig.module.rules[1].options = {
  compilerModules: [
    {
      postTransformNode: el => {
        el.staticStyle = `$processStyle(${el.staticStyle})`;
        el.styleBinding = `$processStyle(${el.styleBinding})`;
      }
    }
  ]
};

//native端使用的js
let nativeConfig = getBaseConfig();
nativeConfig.output.filename = '[name].weex.js';
nativeConfig.module.rules[1].loader = 'weex-loader';

module.exports = [webConfig, nativeConfig];
