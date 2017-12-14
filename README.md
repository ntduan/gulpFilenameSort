# gulpFilenameSort
将文件按照文件名的字典顺序排序，示例
```
  const sort = require('gulp-filename-sort')
  // previous: 按照所给数组顺序排序，并且置于前面
  // fllowing: 按照所给数组顺序排序，并且置于最后
  gulp.src('**/*')
    .pipe(sort({ previous: [
      'bootstrap.min.css',
      'app.css',
      'jquery.js',
      'angular.js',
    ]}))
```
