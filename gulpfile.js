'use strict';

const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const banner = require('browserify-banner');

gulp.task('browserify', () => {
    return browserify('./src/piii.js', {standalone: 'piii'})
        .plugin(banner, {file: './.banner.txt'})
        .bundle()
        .pipe(source('piii.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', ['browserify'], () => {
    return gulp.src('./dist/piii.js')
        .pipe(uglify({output: {comments: '/^!.*$/'}}))
        .pipe(rename('piii.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['uglify']);
