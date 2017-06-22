var gulp = require("gulp"),
requireDir  = require("require-dir"),
gutil 		= require("gulp-util"),
chalk 		= require("chalk"); 
requireDir("./gulp-tasks", {recurse: true});

gulp.task("default", ["start"], function() {
	console.log(chalk.blue('Server listening with tasks:'),chalk.green(' Start'))
});