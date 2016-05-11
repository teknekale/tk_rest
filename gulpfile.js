var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.dev.js'),
    webpackConfigbuild = require('./webpack.config.prod.js'),
    protractor = require("gulp-protractor").protractor,
    path = require('path'),
    child_process = require('child_process'),
    del = require('del');

gulp.task('default', ['webpack:build']);
gulp.task('build', ['webpack:build']);
gulp.task('run', ['watch-dev']);

gulp.task('watch-dev', ['webpack:dev'], function() {
    gulp.watch(['client/**/*'], ['webpack:dev']);
});

gulp.task('copy-static-dev', function() {
    gulp.src(['client/images/**/*']).pipe(gulp.dest('build-dev/images'));
    gulp.src(['client/fonts/**/*']).pipe(gulp.dest('build-dev/fonts'));
});

gulp.task('copy-static-site', function() {
    gulp.src(['client/images/**/*']).pipe(gulp.dest('build-site/images'));
    gulp.src(['client/fonts/**/*']).pipe(gulp.dest('build-site/fonts'));
});

gulp.task('webpack:dev', ['copy-static-dev'], function(callback) {
    var config = Object.create(webpackConfig);

    config.debug = true;
    config.devtool = 'source-map';
    config.resolve.alias['config'] = 'config.js';

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            'colors': true
        }));
        callback();
    });
});

gulp.task('webpack:build', ['copy-static-site'], function(callback) {
    var config = Object.create(webpackConfigbuild);

    config.debug = true;
    config.devtool = 'source-map';
    config.resolve.alias['config'] = 'config.js';

    config.plugins = config.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            'minimize': true
        })
    );

    webpack(config, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack:build]', stats.toString({
            'colors': true
        }));
        callback();
    });
});