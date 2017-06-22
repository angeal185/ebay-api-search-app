var gulp = require('gulp');
var nodemon = require("gulp-nodemon");

// Task to watch for changes and reload server
gulp.task("start", function () {
	nodemon(/* change settings via nodemon.json*/);
});