var gulp = require('gulp');
var install = require('gulp-install');
var zip = require('gulp-zip');
var gulpSequence = require('gulp-sequence').use(gulp);
var del = require('del');
//var mocha = require('gulp-mocha');

gulp.task('clean', function(callback) {
  return del('./dist', callback);
});

gulp.task('js', function() {
  return gulp.src(['src/index.js', 'src/create.js', 'src/delete.js'])
    .pipe(gulp.dest('dist/'))
});

gulp.task('npm', function() {
  return gulp.src('package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}));
});

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', '!dist/package.json', '!dist/package-lock.json', 'dist/.*'])
    .pipe(zip('lambda.zip'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('source-zip', function() {
  return gulp.src(['**/*', '!node_modules/**', '!dist/**', 'README.md'])
    .pipe(zip('source.zip'))
    .pipe(gulp.dest('dist/'));
});

//gulp.task('test', function() {
//  return gulp.src('test/**/*', {read: false})
//      .pipe(mocha());
//});

gulp.task('package', gulpSequence('clean', ['js', 'npm'], 'zip'));

gulp.task('default', gulpSequence('package'));
