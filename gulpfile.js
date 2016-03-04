var del = require('del'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var paths = {
  scripts: 'src/js/**/*.js',
  styles: 'src/css/**/*.css'
};

gulp.task('clean-scripts', function() {
  return del('js/**/*.js');
});

gulp.task('clean-styles', function() {
  return del('css/**/*.css');
});

gulp.task('scripts-dev', ['clean-scripts'], function() {
  gulp.src(paths.scripts)
    .pipe(gulp.dest('js'));
});

gulp.task('scripts', ['clean-scripts'], function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('js'));
});

gulp.task('styles-dev', ['clean-styles'], function() {
  gulp.src(paths.styles)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(gulp.dest('css'));
});

gulp.task('styles', ['clean-styles'], function() {
  gulp.src(paths.styles)
    .pipe(minifyCSS())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts-dev']);
  gulp.watch(paths.styles, ['styles-dev']);
});

gulp.task('default', ['watch']);
gulp.task('dev', ['scripts-dev', 'styles-dev']);
gulp.task('prod', ['scripts', 'styles']);
