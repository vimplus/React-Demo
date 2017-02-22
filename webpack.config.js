var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var loaderUtils = require('loader-utils');
var options = loaderUtils.getOptions(this);

module.exports = {
  watch: true, //监听变化自动编译
  //文件入口配置
  entry: {
    index: "./src/index.js"
  },
  //文件输出配置
  output: {
    path: __dirname + "/dist", //打包输出目录
    publicPath: './dist', //webpack-dev-server访问的路径
    filename: "[name].min.js"
  },
  //加载器配置
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?modules!postcss'
      })
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'
    }, {
      test: /\.(png|jpg|gif)$/i,
      loader: 'url-loader?limit=8192'
    }]
  },
  //插件项
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("./dist/css/[name].css"),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './index.html', //html模板路径
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        }
      }
    })
  ]
}
