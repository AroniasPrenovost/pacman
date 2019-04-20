var gulp = require('gulp'),
	 sass = require('gulp-sass'),
	 browserSync = require('browser-sync').create();


gulp.task('hello', function() {
  console.log('Hello Aron');
});


gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Glob .scss files in src/scss
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('browserSync', function() {
        browserSync.init({
    server: {
      baseDir: './' // root folder
    },
  })
})


gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  // Other watchers
});
