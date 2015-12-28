var gulp = require("gulp"),
    gutil = require("gulp-util"),
    concat = require("gulp-concat"),
    mainBowerFiles = require("main-bower-files"),
    uglify = require("gulp-uglify");


var debug = false;

gulp.task("js", function() {
    debug = debug || false;

    var plugins = mainBowerFiles("**/*.js");
    if(debug) gutil.log(plugins);

    var src = gulp.src(plugins);
    if(!debug) src = src.pipe(uglify());

    return src
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("static/dist/"));
});

gulp.task("css", function() {
    debug = debug || false;
    var plugins = mainBowerFiles("**/*.css");
    if(debug) gutil.log(plugins);

    var src = gulp.src(plugins);
    if(!debug) src = src.pipe(uglify());

    return src
        .pipe(concat("lib.css"))
        .pipe(gulp.dest("static/dist/"));
});

gulp.task("default", ["js","css"]);

gulp.task("debug", function() {
    debug = true;
    gutil.log(gutil.colors.green('RUNNING IN DEBUG MODE'));
    gulp.start('default');
})