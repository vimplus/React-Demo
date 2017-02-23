var webpack = require('webpack');
var path = require("path");

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
        path: __dirname + '/dist',  //打包输出目录
        publicPath: '/',           //webpack-dev-server访问的路径
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
                loader: 'css-loader?sourceMap' 
            })
        }, {
            test: /\.(scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                loader: 'css-loader?sourceMap!sass-loader?sourceMap'
            })
        }, {
            test: /\.(png|jpg|gif)$/i,
            loader: 'url-loader?limit=8192'
        }]
    },
    //插件项
    plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            template: './index.html', //html模板路径
        }),
    new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [autoprefixer];
                }
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            libs: path.resolve('./src/libs'),
            css: path.resolve('./src/css'),
            img: path.resolve('./src/images'),
            api: path.resolve('./src/api'),
            cpn: path.resolve('./src/components'),
            route: path.resolve('./src/route'),
            data: path.resolve('./src/data')
        },
        modules: ['node_modules']
    }
}