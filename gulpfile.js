/*global require*/
"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

var paths = {
    public: './public/',
    img: './public/img',
    sass: './src/sass/',
    css: './public/css/',

};

gulp.task('assets', function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest(paths.img));
});

gulp.task('js', function () {
    return gulp.src('./src/*.js*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('html', function () {
    return gulp.src('./src/*.html*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass + '*.sass')
        .pipe(sass({
            includePaths: [paths.sass],
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.sass', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('browser-sync', ['html', 'sass', 'assets', 'js'], function () {
    browserSync({
        server: {
            baseDir: paths.public
        },
        notify: false
    });
});

gulp.task('build', ['sass', 'html', 'assets', 'js']);

gulp.task('default', ['browser-sync', 'watch']);