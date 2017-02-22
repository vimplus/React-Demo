var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: '.'
    },
  })
})

gulp.task('dev', ['browserSync','sass'], function () {
    
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', browserSync.reload);
    gulp.watch('./src/*.html', browserSync.reload);
    /*browserSync.init({
        server:{
            baseDir:'src'
        }
    })*/
})