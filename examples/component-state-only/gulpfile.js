const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const del = require('del');
const fs = require('fs-extra');

gulp.task('clean', function() {
	return del.sync('build/**');
});

gulp.task('static-web', function() {
	gulp.src('./style/**/*.css')
	.pipe(gulp.dest('build/style'));
});

gulp.task('webpack', function(callback) {
	webpack(webpackConfig, function(err, stats) {
		if(err) {
			gutil.log('[webpack]', err);
			throw new gutil.PluginError('webpack', err);
		}
		gutil.log('[webpack]', stats.toString({
			hash: false,
			version: false,
			assets: false,
			chunks: false,
			modules: false,
			children: false,
			source: false,
			publicPath: false,
			errors: true,
			errorDetails: true,
			warnings: true
		}));
		callback();
	});
});

gulp.task('build', ['clean', 'webpack', 'static-web']);

gulp.task('default', ['build']);