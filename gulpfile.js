var gulp = require('gulp')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var rename = require('gulp-rename')
var pipeline = require('readable-stream').pipeline

function renameJs (file) {
  if (file.extname === '.js') {
    file.basename = file.basename + '.min'
  }
}

gulp.task('build', function () {
  return pipeline(
    gulp.src('src/*.js'),
    babel({
      presets: ['@babel/env']
    }),
    uglify(),
    rename(renameJs),
    gulp.dest('dist')
  )
})
