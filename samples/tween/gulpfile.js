var gulp = require('gulp');
var path = require('path');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');;
var tsconfig = require('./tsconfig.json');
var webpackConfig = require('./webpack.config.js');

const tsconfigPaths = tsconfig.compilerOptions.paths;
if (tsconfigPaths) {
  webpackConfig.resolve.alias = {};
  Object.keys(tsconfigPaths).forEach(function(key) {
    webpackConfig.resolve.alias[key] = path.resolve(__dirname, tsconfigPaths[key][0]);
  });
}
 
gulp.task('webpack', function () {
    gulp.src(['./src/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('connect', function() {
  connect.server({
    root: './www'
  });
});
 
gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['webpack']);
});
 
gulp.task('default', ['webpack','watch','connect']);
