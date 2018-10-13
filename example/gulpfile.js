const gulp = require('gulp');
const { Transform } = require('stream');

const order = require('./ooo.js');

gulp.task('test', () => {
  gulp
    .src('./test/**/*.js')
    .pipe(order())
    .pipe(
      new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
          console.log(file, 111);
          callback(null, file);
        },
      })
    );
  // .pipe(gulp.dest('./dest/'));
});
