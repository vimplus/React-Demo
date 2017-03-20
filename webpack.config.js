const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

//const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;  //webpack 2 已不需要

//const HtmlFilePlugin = require('html-file-webpack-plugin');
// const loaderUtils = require('loader-utils');
// const options = loaderUtils.getOptions(this);
process.noDeprecation = true;

module.exports = {
    //文件入口配置
    entry: {
        index: "./src/entry/index.js",
        vendor: ['react', 'react-dom', 'react-router']
    },
    //文件输出配置
    output: {
        path: __dirname + '/dist', //打包输出目录
        publicPath: '//static.react.thinktxt.com/', //webpack-dev-server访问的路径
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[id].chunk.[chunkhash:8].js'
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
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: false
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
        new webpack.HashedModuleIdsPlugin(),  //稳定chunkhash
        new AggressiveMergingPlugin(),  //Merge chunks
        // new ManifestPlugin(),
        // new ChunkManifestPlugin({
        //   filename: "manifest.json",
        //   manifestVariable: "webpackManifest"
        // }),
        // new HtmlFilePlugin({
  	    //     filename: 'manifest.json'
  	    // }),
        new InlineManifestWebpackPlugin({
          name: 'webpackManifest'
        }),
        new CommonsChunkPlugin({
            name:['manifest', 'vendor'].reverse(),
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html',
            template: './src/views/index.html', //html模板路径
            chunks: ['manifest', 'vendor', 'index']  // manifest: 可以理解为模块清单，载货单
        }),
        new HtmlWebpackHarddiskPlugin(),
        //new WebpackMd5Hash(),  //有bug, 模块更新了，却不更新manifest，导致请求的还是旧模块版本资源
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
