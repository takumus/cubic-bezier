var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({
        entries: './src/index.ts',
        detectGlobals: true,
        standalone: 'CubicBezier'
    }).plugin('tsify')
        .bundle()
        .pipe(source('./index.js'))
        .pipe(gulp.dest('./src'));
});
gulp.task('watch', function(){
    gulp.watch('./src/**/*.ts', ['build']);
});
gulp.task('default', ['build', 'watch']);