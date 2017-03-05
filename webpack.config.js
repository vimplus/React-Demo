const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');

// const loaderUtils = require('loader-utils');
// const options = loaderUtils.getOptions(this);
process.noDeprecation = true;

module.exports = {
    watch: true, //监听变化自动编译
    //文件入口配置
    entry: {
        index: "./src/entry/index.js",
        vendor: ['react', 'react-dom']
    },
    //文件输出配置
    output: {
        path: __dirname + '/dist', //打包输出目录
        publicPath: '//static.react.thinktxt.com/', //webpack-dev-server访问的路径
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash:8].js'
    },
    //加载器配置
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            }
        }, {
            test: /\.(css|scss|sass)$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [{
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            test: /\.(png|jpg|gif)$/i,
            loader: 'url-loader?limit=8192'
        }]
    },
    //插件项
    plugins: [
        new CommonsChunkPlugin({
            name:['vendor'].reverse(),
            minChunks: 3
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            template: './src/index.html', //html模板路径
        }),
        new HtmlWebpackHarddiskPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
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
            routes: path.resolve('./src/routes'),
            data: path.resolve('./src/data')
        },
        modules: ['node_modules']
    }
}
