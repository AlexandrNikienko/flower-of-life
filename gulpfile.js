var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    webserver = require('gulp-webserver'),
    del = require('del'),
    sass = require('gulp-sass');

var util = require('gulp-util');

gulp.task('default', ['webServer', 'watch']);

gulp.task('watch', ['sass'], function () {
    gulp.watch(['./styles/styles.scss'], ['sass']);
});

gulp.task('sass', ['cleanStyles'], function () {
    log('Compiling CSS from Scss');
    gulp.src(['./styles/styles.scss'])
        .pipe(plumber())
        .pipe(concat('all.min.scss'))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./styles'));
});

gulp.task('cleanStyles', function () {
    var files = './styles/all.min.css';
    clean(files);
});

gulp.task('webServer', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: true
        }))
});

function clean(path){
    log("Cleaning " + util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}
