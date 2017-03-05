const webpack = require('webpack');
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const AggressiveMergingPlugin = webpack.optimize.AggressiveMergingPlugin;
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;  //webpack 2 已不需要

// const loaderUtils = require('loader-utils');
// const options = loaderUtils.getOptions(this);
process.noDeprecation = true;

module.exports = {
    watch: true, //监听变化自动编译
    //文件入口配置
    entry: {
        index: "./src/entry/index.js",
        vendor: ['react', 'react-dom', 'react-router']
    },
    //文件输出配置
    output: {
        path: __dirname + '/dist', //打包输出目录
        publicPath: '//static.react.thinktxt.com/', //webpack-dev-server访问的路径
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[id].chunk.[chunkhash:8].js'
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
                fallbackLoader: 'style-loader',
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
        //   filename: "chunk-manifest.json",
        //   manifestVariable: "webpackManifest"
        // }),
        new InlineManifestWebpackPlugin(),
        new CommonsChunkPlugin({
            name:['manifest', 'vendor'].reverse(),
            minChunks: 3
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            template: './src/index.html', //html模板路径
            chunks: ['manifest', 'vendor', 'index']  // manifest: 可以理解为模块单，载货单
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
