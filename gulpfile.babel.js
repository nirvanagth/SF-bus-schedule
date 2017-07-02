const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const babel = require('babelify')
const del = require('del')
const nodemon = require('gulp-nodemon')
const gulpLivereload = require('gulp-livereload')
const logger = require('global/console')
const sass = require('gulp-sass')

gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('watch-server', () => {
  nodemon({
    exec: 'npm',
    ext: 'js json jsx yaml jade',
    script: 'start',
    ignore: ['node_modules/', 'dist/']
  })
})

gulp.task('watch-javascripts', () => {
  gulp.watch(
    [
      'src/client/javascripts/**/*.js',
      'src/client/javascripts/**/*.jsx',
      'src/client/javascripts/**/*.json',
      'src/shared/**/*.js',
      'src/shared/**/*.jsx',
      'src/shared/**/*.json'
    ],
    ['compile-javascripts']
  )
})

gulp.task('compile-javascripts', () => {
  const bundler = browserify('src/client/javascripts/main.js',
    {debug: true}).transform(babel)

  bundler.bundle()
    .on('error', function onError(err) {
      logger.error(err)
    })
    .pipe(source('src/client/javascripts/main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-livereload', () => {
  gulp.watch(['dist/**/*'], function onChange(e) {
    gulpLivereload.changed(e.path)
  })
})

gulp.task('compile-stylesheets', () => {
  return gulp.src('src/client/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/stylesheets'))
})

gulp.task('watch-stylesheets', () => {
  gulp.watch('src/client/**/*.scss', ['compile-stylesheets'])
})

gulp.task('compile-static', () => {
  return gulp.src('src/client/static/**/*')
    .on('error', function onError(err) {
      logger.error(err)
    })
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-static', () => {
  gulp.watch('src/client/static/**/*', ['compile-static'])
})

gulp.task('build', ['compile-javascripts', 'compile-stylesheets', 'compile-static'])
gulp.task('watch', ['build', 'watch-javascripts', 'watch-server', 'watch-stylesheets', 'watch-static'])
gulp.task('default', ['watch'])
