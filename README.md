# gulpFilenameSort

一个无依赖的排序 gulp stream 中的文件的库。

支持三种方式排序：

1.默认按文件名 localCompare 的顺序排序。

```javascript
// 输入文件
// const filePaths = [
//   '3.js',
//   'test.js',
//   './ventor/bootstrap.css',
//   '22.js',
//   './script/jquery/jQuery.js',
//   'angular.js',
//   './style/ant.css',
//   'wow.png',
// ];

gulpSort(['angular.js', 'wow.png']); // stream 中顺序变为 ['22.js','3.js','angular.js','ant.css','bootstrap.css','jQuery.js','test.js','wow.png']
```

2.传递一个需要前置文件的数组

```javascript
// 输入文件
// const filePaths = [
//   '3.js',
//   'test.js',
//   './ventor/bootstrap.css',
//   '22.js',
//   './script/jquery/jQuery.js',
//   'angular.js',
//   './style/ant.css',
//   'wow.png',
// ];

gulpSort(['angular.js', 'wow.png']); // stream 中顺序变为 [  'angular.js', 'wow.png', '22.js', '3.js', 'ant.css', 'bootstrap.css', 'jQuery.js', 'test.js']
```

3.传递一个自定义的比较函数

```javascript
// 输入文件
// const filePaths = [
//   '3.js',
//   'test.js',
//   './ventor/bootstrap.css',
//   '22.js',
//   './script/jquery/jQuery.js',
//   'angular.js',
//   './style/ant.css',
//   'wow.png',
// ];

// 接受两个完整的路径，如果 pathA > pathB 返回 -1，pathA < pathB 返回 1。相等则返回 0
const mySort = gulpSort((pathA, pathB) => {
  if (basename(pathA) === '22.js') return 1;
  if (basename(pathB) === '22.js') return -1;
  return basename(pathA).localeCompare(basename(pathB));
}); // stream 中顺序变为 ['3.js','angular.js','ant.css','bootstrap.css','jQuery.js','test.js','wow.png', '22.js']
```

具体可以参照源码，或测试用例