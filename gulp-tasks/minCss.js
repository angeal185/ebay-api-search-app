var gulp 	= require("gulp"),
minifyCSS 	= require("gulp-minify-css"), 			
concatCss = require("gulp-concat-css"), 		
notify 		= require("gulp-notify");

gulp.task("minCss", function () {
  return gulp.src(["./app/css/*.css"])
	.pipe(minifyCSS())
    .pipe(gulp.dest("./app/css/"))
	.pipe(notify("Task ConcatCss complete."));
});