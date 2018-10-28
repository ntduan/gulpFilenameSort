const Path = require('path');
const File = require('vinyl');
const gulpSort = require('../');
const { basename } = require('path');

describe('gulp filename sort', () => {
  const createFile = filepath => {
    const cwd = process.cwd();
    const path = Path.join(cwd, filepath);
    const base = Path.dirname(path);
    return new File({
      cwd,
      path,
      base,
      contents: Buffer.from(''),
    });
  };

  const filePaths = [
    '3.js',
    'test.js',
    './ventor/bootstrap.css',
    '22.js',
    './script/jquery/jQuery.js',
    'angular.js',
    './style/ant.css',
    'wow.png',
  ];

  test('默认排序', done => {
    const mySort = gulpSort();

    const expectFiles = [];

    mySort.on('data', file => {
      expectFiles.push(file);
    });

    mySort.on('end', file => {
      expect(expectFiles.map(file => basename(file.path))).toEqual([
        '22.js',
        '3.js',
        'angular.js',
        'ant.css',
        'bootstrap.css',
        'jQuery.js',
        'test.js',
        'wow.png',
      ]);
      done();
    });

    for (const filePath of filePaths) {
      mySort.write(createFile(filePath));
    }

    mySort.end();
  });

  test('前置文件', done => {
    const mySort = gulpSort(['angular.js', 'wow.png']);

    const expectFiles = [];

    mySort.on('data', file => {
      expectFiles.push(file);
    });

    mySort.on('end', file => {
      expect(expectFiles.map(file => basename(file.path))).toEqual([
        'angular.js',
        'wow.png',
        '22.js',
        '3.js',
        'ant.css',
        'bootstrap.css',
        'jQuery.js',
        'test.js',
      ]);
      done();
    });

    for (const filePath of filePaths) {
      mySort.write(createFile(filePath));
    }

    mySort.end();
  });

  test('自定义 compare', done => {
    const mySort = gulpSort((pathA, pathB) => {
      if (basename(pathA) === '22.js') return 1;
      if (basename(pathB) === '22.js') return -1;
      return basename(pathA).localeCompare(basename(pathB));
    });

    const expectFiles = [];

    mySort.on('data', file => {
      expectFiles.push(file);
    });

    mySort.on('end', file => {
      expect(expectFiles.map(file => basename(file.path))).toEqual([
        '3.js',
        'angular.js',
        'ant.css',
        'bootstrap.css',
        'jQuery.js',
        'test.js',
        'wow.png',
        '22.js',
      ]);
      done();
    });

    for (const filePath of filePaths) {
      mySort.write(createFile(filePath));
    }

    mySort.end();
  });
});
