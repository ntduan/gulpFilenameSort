const Path = require('path');
const File = require('vinyl');
const gulpSort = require('../');

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

  test('should sort', () => {
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

    const mySort = gulpSort();

    const expectFiles = [];

    mySort.on('data', file => {
      expectFiles.push(file);
    });

    mySort.on('end', file => {
      console.log(expectFiles);
    });

    for (const filePath of filePaths) {
      mySort.write(createFile(filePath));
    }

    mySort.end();
  });

  // console.log(files);
  // return globalDatabase.find('thing', {}, results => {
  //   expect(results.length).toBeGreaterThan(0);
  // });
});

// stream.on "data", files.push.bind(files)
//       stream.on "end", ->
//         expect(files.length).to.equal 4
//         expect(files[0].relative).to.equal "foo.js"
//         expect(files[1].relative).to.equal "bar.js"
//         expect(files[2].relative).to.equal "baz-a.js"
//         expect(files[3].relative).to.equal "baz-b.js"
//         done()
