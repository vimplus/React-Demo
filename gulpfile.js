var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var browserSync = require('browser-sync');

var devConfig = require('./webpack.config.js');
var devStats = {
	colors: true,
	reasons: false,
	chunks: false, //屏蔽(react)模块的一些明细
	chunkModules: false,
	chunkOrigins: false,
	modules: false,
	cached: false,
	cachedAssets: false,
	children: false,
	warning: false
};

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
		stats: devStats
	};
	new webpackDevServer(compiler, serverConfig).listen(8080,
		"localhost",
		function(err) {
			if (err) throw new gutil.PluginError(
				"webpack-dev-server", err);
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
		gutil.log("[webpack]", stats.toString(devStats));
		callback();
	});

});

function reconfig(config) {
	config.watch = false;
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
