var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var browserSync = require('browser-sync');

var devConfig = require('./webpack.config.js');
var buildInfo = {
	assets: true,			// 增加资源信息
	assetsSort: "field",	// 对资源按指定的项进行排序
	cached: false,			// 增加缓存了的（但没构建）模块的信息
	children: false,		// 增加子级的信息
	chunks: false,			// 增加包信息（设置为 `false` 能允许较少的冗长输出）
	chunkModules: false,	// 将内置模块信息增加到包信息
	chunkOrigins: false,	// 增加包 和 包合并 的来源信息
	chunksSort: "field",	// 对包按指定的项进行排序
	context: "../src/",		// 用于缩短请求的上下文目录
	colors: true,			// 等同于`webpack --colors`
	errors: true,			// 增加错误信息
	errorDetails: true,		// 增加错误的详细信息（就像解析日志一样）
	hash: true,				// 增加编译的哈希值
	modules: false,			// 增加内置的模块信息
	modulesSort: "field",	// 对模块按指定的项进行排序
	publicPath: true,		// 增加 publicPath 的信息
	reasons: true,			// 增加模块被引入的原因
	source: true,			// 增加模块的源码
	timings: true,			// 增加时间信
	version: false,			// 增加 webpack 版本信息
	warnings: true			// 增加提示
}


gulp.task('sass', function() {
	return gulp.src('./src/css/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: '.'
		},
	})
})

gulp.task('server', function(callback) {
	var compiler = webpack(devConfig);
	var serverConfig = {
		hot: true,
		contentBase: 'dist',
		stats: buildInfo
	};
	new webpackDevServer(compiler, serverConfig).listen(8080, "127.0.0.1", function(err) {
			if (err) throw new gutil.PluginError("webpack-dev-server", err);
			// Server listening
			gutil.log("[webpack-dev-server]",
				"http://localhost:8080");
		});
})


gulp.task('dev', ['browserSync', 'sass', 'webpack'], function() {
	gulp.watch('./src/css/**/*.scss', ['sass']);
	gulp.watch('./src/js/**/*.js', browserSync.reload);
	gulp.watch('./src/*.html', browserSync.reload);
})


// 打包发布
gulp.task('release', function(callback) {
	var config = reconfig(devConfig);
	return webpack(config, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString(buildInfo));
		callback();
	});

});

function reconfig(config) {
	config.output.publicPath = '/';
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		})
	);
	return config;
}
