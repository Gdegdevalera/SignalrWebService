/// <binding />
var paths = {
	webroot: "./wwwroot/"
};

var gulp = require('gulp'),
	concat = require("gulp-concat"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify");

//gulp.task("scripts", function () {

//	return gulp.src([
//		"Scripts/jquery-*.js",
//		"Scripts/modernizr*.js",
//		"Scripts/bootstrap.js",
//		"Scripts/respond.js",
//	])
//	.pipe(concat("all.js"))
//	.pipe(gulp.dest(paths.webroot))
//	.pipe(rename("all.min.js"))
//	.pipe(uglify())
//	.pipe(gulp.dest(paths.webroot));

//});

gulp.task("styles", function () {

	return gulp.src([
		"Content/bootstrap.css",
		"Content/Site.css"
	])
	.pipe(concat("all.css"))
	.pipe(gulp.dest(paths.webroot));

});
