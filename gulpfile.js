const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// 記得更改 src / dest / watch 的檔案位置
gulp.task('sass', function () {
  return gulp.src('apo_styles/*.scss').pipe(sass()).pipe(gulp.dest('assets'));
});

gulp.task('watch', function () {
  gulp.watch('apo_styles/**/*.scss', gulp.series('sass'));
});
