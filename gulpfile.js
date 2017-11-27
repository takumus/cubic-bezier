var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');
var merge2 = require('merge2');
gulp.task('tsc', function () {
    var tsc = gulp.src('./src/**/*.ts')
    .pipe(ts({
        declaration: true
    }));
    return merge2([
        tsc.dts.pipe(gulp.dest('./dest/')),
        tsc.js.pipe(gulp.dest('./dest/'))
    ]);
});
gulp.task('watch', function () {
    gulp.watch('./src/**/*.ts', ['tsc']);
});
 
gulp.task('default', ['tsc', 'watch']);
