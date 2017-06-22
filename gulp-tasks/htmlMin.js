var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlMin', function() {
  return gulp.src('./**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});