'use strict'

//Dependences
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')
var changed = require('gulp-changed');

// SCSS/CSS
var SCSS_SRC = './src/Assets/styles/scss/**/*.scss';
var SCSS_DEST = './src/Assets/styles/css/';

// Compile SCSS
gulp.task('compile_scss', gulp.series(function(){

    return gulp.src(SCSS_SRC)
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(changed(SCSS_DEST))
      .pipe(gulp.dest(SCSS_DEST));
}));

// Detect Changes in SCSS_SRC
gulp.task('watch_scss', function(){
    gulp.watch(SCSS_SRC, gulp.series('compile_scss'));
});

// Run tasks
gulp.task('default', gulp.series('watch_scss'));
