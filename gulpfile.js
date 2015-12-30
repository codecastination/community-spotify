var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var mainBowerFiles = require("main-bower-files");
var uglify = require("gulp-uglify");
var streamqueue = require('streamqueue');
var nano = require('gulp-cssnano');
var less = require("gulp-less");

var debug = false;
var outputRoot = "app/static/";


gulp.task("lib_js", function () {
    debug = debug || false;

    var plugins = mainBowerFiles("**/*.js");
    if (debug) gutil.log(plugins);

    var src = gulp.src(plugins);
    if (!debug) src = src.pipe(uglify());

    return src
        .pipe(concat("lib.js"))
        .pipe(gulp.dest(outputRoot+"dist/"));
});

gulp.task("lib_css", function () {
    debug = debug || false;
    return streamqueue({objectMode: true},
        gulp.src(mainBowerFiles("**/*.less")).pipe(less()),
        gulp.src(mainBowerFiles("**/*.css")))
        .pipe(concat('lib.css')).pipe(nano()).pipe(gulp.dest(outputRoot+"dist/"))
});


gulp.task("default", ["lib_js", "lib_css"]);

gulp.task("debug", function () {
    debug = true;
    gutil.log(gutil.colors.green('RUNNING IN DEBUG MODE'));
    gulp.start('default');
})